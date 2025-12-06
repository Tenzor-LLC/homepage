# Discord Webhook Setup Guide

This guide will help you set up a Discord webhook to receive contact form submissions from your website.

## Step 1: Create a Discord Webhook

1. Open your Discord server
2. Right-click on the channel where you want to receive notifications
3. Select **Edit Channel**
4. Navigate to **Integrations** in the left sidebar
5. Click on **Webhooks**
6. Click **New Webhook** (or **Create Webhook**)
7. Give your webhook a name (e.g., "Contact Form Notifications")
8. Optionally, customize the webhook's avatar
9. Click **Copy Webhook URL**

## Step 2: Configure Environment Variable

1. Open the `.env.local` file in your project root
2. Replace `your_discord_webhook_url_here` with the webhook URL you copied:

```env
NEXT_PUBLIC_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
```

3. Save the file

## Step 3: Restart Your Development Server

If you're running the development server, restart it to load the new environment variable:

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

## Step 4: Test the Form

1. Navigate to your website's contact form
2. Fill out all required fields
3. Click "Send message"
4. Check your Discord channel - you should see a notification with the form submission!

## What the Webhook Sends

The Discord notification includes:
- 📝 Challenge/Goal
- 👤 Name
- 📧 Email
- 📞 Phone (if provided)
- 🏢 Company (if provided)
- 🔒 NDA Required status
- ✅ Privacy Consent status
- Timestamp of submission

## Security Notes

- Never commit your `.env.local` file to version control (it's already in `.gitignore`)
- Keep your webhook URL private - anyone with the URL can send messages to your Discord channel
- If you accidentally expose your webhook URL, delete it in Discord and create a new one

## Troubleshooting

### "Discord webhook is not configured" error
- Make sure you've added the webhook URL to `.env.local`
- Verify the environment variable name is exactly `NEXT_PUBLIC_DISCORD_WEBHOOK_URL`
- Restart your development server after adding the environment variable

### Form submits but no Discord message
- Check that the webhook URL is correct
- Verify the webhook channel still exists
- Make sure the webhook hasn't been deleted in Discord

### Rate Limiting
Discord webhooks have rate limits. If you're receiving many submissions in a short time:
- Standard webhooks: 30 requests per minute
- Consider implementing additional backend logic if you expect high volume
