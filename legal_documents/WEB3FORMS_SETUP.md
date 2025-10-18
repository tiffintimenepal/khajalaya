# Web3Forms Setup Guide for Account Deletion Form

## Overview
The account deletion form in the privacy policy page is now integrated with Web3Forms to automatically send emails to `tiffintimenepal@gmail.com`.

## Setup Instructions

### 1. Get Web3Forms Access Key
1. Go to [https://web3forms.com](https://web3forms.com)
2. Sign up for a free account
3. Create a new form
4. Copy your **Access Key**

### 2. Update the Form Configuration
Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `privacy-policy.html` with your actual access key:

```html
<input type="hidden" name="access_key" value="YOUR_ACTUAL_ACCESS_KEY_HERE">
```

### 3. Form Configuration Details
The form is already configured with:
- **To Email**: `tiffintimenepal@gmail.com`
- **Subject**: `Account Deletion Request - Khajalaya`
- **From Name**: `Khajalaya Privacy Policy`
- **Redirect**: `false` (stays on page)

### 4. Form Fields
The form collects:
- **Email Address** (required)
- **Phone Number** (optional)
- **Reason for Deletion** (dropdown)
- **Additional Information** (textarea)
- **Confirmation Checkboxes** (required)

### 5. Email Template
When submitted, Web3Forms will send an email with:
- User's email address
- Phone number (if provided)
- Reason for deletion
- Additional information
- Confirmation status
- Timestamp and technical details

## Features

### ✅ **Automatic Email Delivery**
- Emails sent directly to `tiffintimenepal@gmail.com`
- Professional formatting
- All form data included

### ✅ **User Experience**
- Real-time validation
- Loading states
- Success/error notifications
- Form reset after submission

### ✅ **Security**
- CSRF protection
- Rate limiting
- Spam protection
- Secure API endpoints

### ✅ **Responsive Design**
- Works on all devices
- Mobile-optimized
- Accessible design

## Testing

### 1. Test the Form
1. Fill out the form with test data
2. Submit and check for success notification
3. Verify email is received at `tiffintimenepal@gmail.com`

### 2. Check Email Format
The email should contain:
- Subject: "Account Deletion Request - Khajalaya"
- From: "Khajalaya Privacy Policy"
- All form data properly formatted

## Troubleshooting

### Common Issues

1. **Form Not Submitting**
   - Check if access key is correct
   - Verify internet connection
   - Check browser console for errors

2. **No Email Received**
   - Check spam folder
   - Verify email address is correct
   - Check Web3Forms dashboard for delivery status

3. **Validation Errors**
   - Ensure all required fields are filled
   - Check email format
   - Verify checkboxes are checked

### Support
- Web3Forms Documentation: [https://docs.web3forms.com](https://docs.web3forms.com)
- Contact: support@web3forms.com

## Cost
- **Free Plan**: Up to 250 submissions per month
- **Paid Plans**: Available for higher volumes
- **No Credit Card Required**: For free plan

## Privacy & Compliance
- GDPR compliant
- Data encrypted in transit
- No data stored on Web3Forms servers
- Emails sent directly to your inbox
