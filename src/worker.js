// Cloudflare Worker Entrypoint - Serves Static Assets & Handles /api/send-email

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. API Route: /api/send-email
    if (url.pathname === '/api/send-email') {
      const jsonResponse = (body, status = 200) => new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
      });
      const inputError = () => jsonResponse({
        success: false,
        error: 'Please check your name, email, and message and try again.',
      }, 400);
      const serverError = () => jsonResponse({
        success: false,
        error: 'Unable to send your message right now. Please try again later.',
      }, 500);

      if (request.method !== 'POST') {
        return jsonResponse({ success: false, error: 'Method not allowed.' }, 405);
      }

      try {
        let payload;
        try {
          payload = await request.json();
        } catch {
          return inputError();
        }

        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
          return inputError();
        }

        const { senderName, senderEmail, senderMessage, website } = payload;

        if (website !== undefined && typeof website !== 'string') {
          return inputError();
        }

        if (website?.trim()) {
          return jsonResponse({ success: true });
        }

        if (
          typeof senderName !== 'string' ||
          typeof senderMessage !== 'string' ||
          (senderEmail !== undefined && typeof senderEmail !== 'string')
        ) {
          return inputError();
        }

        const cleanName = senderName.trim();
        const cleanMessage = senderMessage.trim();
        const cleanEmail = senderEmail?.trim() || '';

        if (
          senderName.length > 100 ||
          senderMessage.length > 5000 ||
          (senderEmail?.length ?? 0) > 254 ||
          !cleanName ||
          cleanName.length > 100 ||
          !cleanMessage ||
          cleanMessage.length > 5000 ||
          cleanEmail.length > 254 ||
          (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail))
        ) {
          return inputError();
        }

        const nodeProcess = typeof globalThis !== 'undefined' ? globalThis.process : undefined;
        const apiKey = env?.RESEND_API_KEY || nodeProcess?.env?.RESEND_API_KEY || null;
        const recipientEmail =
          env?.CONTACT_EMAIL ||
          env?.PORTFOLIO_CONTACT_EMAIL ||
          env?.MAIL_TO ||
          nodeProcess?.env?.CONTACT_EMAIL ||
          '';

        if (!apiKey) {
          console.error('Email service configuration is incomplete.');
          return serverError();
        }

        if (!recipientEmail) {
          console.error('Email service configuration is incomplete.');
          return serverError();
        }

        const replyEmail = cleanEmail || null;

        const escapeHtml = (str) =>
          str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');

        const safeName = escapeHtml(cleanName);
        const safeEmail = replyEmail ? escapeHtml(replyEmail) : 'Not provided';
        const safeMessage = escapeHtml(cleanMessage);

        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #08080c; color: #f8fafc; margin: 0; padding: 24px; }
              .container { max-width: 600px; margin: 0 auto; background: #0e0e16; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 32px; box-shadow: 0 20px 50px rgba(0,0,0,0.6); }
              .header { border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 20px; margin-bottom: 24px; }
              .eyebrow { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #60a5fa; font-weight: 600; }
              .title { font-size: 22px; font-weight: 700; color: #ffffff; margin: 6px 0 0 0; }
              .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 4px; }
              .field-value { font-size: 15px; color: #ffffff; margin-bottom: 20px; font-weight: 500; }
              .field-value a { color: #38bdf8; text-decoration: none; }
              .message-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 18px; color: #e2e8f0; font-size: 14px; line-height: 1.65; white-space: pre-wrap; word-break: break-word; font-family: 'SFMono-Regular', Consolas, monospace; }
              .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #64748b; text-align: center; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="eyebrow">🚀 Transmission Received</div>
                <div class="title">New Message from Portfolio</div>
              </div>
              <div class="field-label">Sender</div>
              <div class="field-value">${safeName}</div>
              <div class="field-label">Email Address</div>
              <div class="field-value">${cleanEmail ? `<a href="mailto:${safeEmail}">${safeEmail}</a>` : '<span style="color:#94a3b8;">Not provided</span>'}</div>
              <div class="field-label">Message Payload</div>
              <div class="message-box">${safeMessage}</div>
              <div class="footer">
                Dispatched from Ujjawal Singhal Portfolio Beacon • ${new Date().toUTCString()}
              </div>
            </div>
          </body>
          </html>
        `;

        const emailPayload = {
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [recipientEmail.trim()],
          subject: `[Portfolio Inquiry] ${cleanName.replace(/[\r\n]+/g, ' ')}`,
          html: emailHtml,
          text: `Name: ${cleanName}\nEmail: ${replyEmail || 'Not provided'}\n\nMessage:\n${cleanMessage}`,
        };

        if (replyEmail) {
          emailPayload.reply_to = replyEmail;
        }

        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey.trim()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailPayload),
        });

        if (!resendRes.ok) {
          console.error('Resend email delivery failed with status:', resendRes.status);
          return serverError();
        }

        return jsonResponse({ success: true });
      } catch {
        console.error('Email dispatch failed.');
        return serverError();
      }
    }

    // 2. API Route: /api/github-stats (Cached Real-Time GitHub Telemetry)
    if (url.pathname === '/api/github-stats') {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }

      const defaultStats = {
        success: true,
        public_repos: 14,
        followers: 2,
        latest_repo: 'resume-analyser',
        latest_repo_desc: 'AI-Powered Resume Builder & ATS Analyzer',
        latest_pushed_at: new Date().toISOString(),
        status: 'online',
      };

      try {
        const ghHeaders = {
            'User-Agent': 'Ujjawal-Singhal-Portfolio/1.0',
            Accept: 'application/vnd.github.v3+json',
          };

          const [userRes, reposRes] = await Promise.all([
            fetch('https://api.github.com/users/ujjawalsinghal', { headers: ghHeaders }),
            fetch('https://api.github.com/users/ujjawalsinghal/repos?sort=pushed&per_page=1', {
          }),
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          const reposData = reposRes.ok ? await reposRes.json() : [];
          const latest = Array.isArray(reposData) && reposData.length > 0 ? reposData[0] : null;

          const statsPayload = {
            success: true,
            public_repos: userData.public_repos || defaultStats.public_repos,
            followers: userData.followers || defaultStats.followers,
            latest_repo: latest ? latest.name : defaultStats.latest_repo,
            latest_repo_desc: latest?.description || defaultStats.latest_repo_desc,
            latest_pushed_at: latest?.pushed_at || userData.updated_at || defaultStats.latest_pushed_at,
            status: 'online',
          };

          return new Response(JSON.stringify(statsPayload), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'public, max-age=1800, s-maxage=1800',
            },
          });
        }

        // Return fallback if GitHub API rate-limits
        return new Response(JSON.stringify(defaultStats), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=600',
          },
        });
      } catch {
        return new Response(JSON.stringify(defaultStats), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // 3. Static Assets fallback (Serves the React portfolio frontend)
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not found', { status: 404 });
  },
};
