# Zwitch

Welcome to **Zwitch**, a powerful and feature-rich streaming platform that combines the best elements of live streaming and social interaction. With advanced features like Google authentication, personalized user dashboards, and real-time chat, Zwitch aims to provide an exceptional streaming experience for both viewers and streamers.

## Features

- **Google Authentication**: Seamless sign-in and sign-up using Google accounts.
- **User Dashboards**: Manage stream settings, user profiles, and account information from an intuitive dashboard.
- **Recommendations System**: Personalized content recommendations based on user preferences and activity.
- **Follow/Unfollow & Block Functionalities**: Connect with other users, follow your favorite streamers, and manage your connections.
- **Live Chat**: Engage with streamers and other viewers in real-time chat during live streams.
- **Search Bar**: Easily find streams, users, and content with a powerful search feature.

## Technologies Used

- **Frontend**: React, Next.js
- **Backend**: Node.js, Express.js
- **Database**: Prisma
- **Authentication**: Google OAuth
- **Live Streaming**: LiveKit
- **Real-Time Communication**: WebSockets
- **Styling**: Tailwind CSS

## Installation

To get started with Zwitch, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/saadshaikh1023/Zwitch.git
   cd Zwitch

2. **Install Dependencies**
   ```bash
   npm install

3. **Set Up Environment Variables**
    To run Zwitch, you'll need to set up several environment variables. Create a `.env` file in the root directory of your project and include the following variables. Replace the placeholders with your own values:
    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   CLERK_SECRET_KEY=your-clerk-secret-key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/
   CLERK_WEBHOOK_SECRET=your-clerk-webhook-secret

   # Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, and CockroachDB.
   DATABASE_URL="your-database-connection-string"

   LIVEKIT_API_URL=your-livekit-api-url
   LIVEKIT_API_KEY=your-livekit-api-key
   LIVEKIT_API_SECRET=your-livekit-api-secret
   NEXT_PUBLIC_LIVEKIT_WS_URL=your-livekit-websocket-url

   UPLOADTHING_SECRET=your-uploadthing-secret
   UPLOADTHING_APP_ID=your-uploadthing-app-id

4. **Run the Development Server**
    ```bash
   npm run dev

##Usage
1) Sign In/Sign Up: Use Google OAuth to sign in or create a new account.
2) Dashboard: Access your personal dashboard to manage stream settings and profile.
3) Search: Use the search bar to find streams and users.
4) Live Chat: Participate in live chats during ongoing streams.
   
##Contributing
We welcome contributions to improve Zwitch. If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request. For detailed contribution guidelines, please refer to the CONTRIBUTING.md file.

##Contact
For any questions or inquiries, please reach out to saadshaikh.business@gmail.com.
