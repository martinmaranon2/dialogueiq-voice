# Supabase Integration Setup

This document explains how to set up Supabase integration for the UBS DialogueIQ Dashboard.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. A new Supabase project created

## Setup Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `ubs-dialogueiq-dashboard`
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
5. Click "Create new project"

### 2. Set Up Database Schema

1. In your Supabase project dashboard, go to the SQL Editor
2. Obtain the compatible `supabase-schema.sql` from the project maintainers; it is not checked into this repository. Match the table fields to the queries in `hooks/` before applying it.
3. Paste it into the SQL Editor
4. Click "Run" to execute the schema creation

This will create:

- `clients` table with all client information
- `conversations` table for client conversations
- `actions` table for client actions/tasks
- `upcoming_events` table for client events
- Sample data for testing

### 3. Get API Keys

1. In your Supabase project dashboard, go to Settings > API
2. Copy the following values:
   - Project URL
   - Anon public key

### 4. Configure Environment Variables

1. Create a `.env.local` file in the root of your project
2. Add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from step 3.

### 5. Install Dependencies

The Supabase client is already installed. If you need to reinstall:

```bash
npm install @supabase/supabase-js
```

### 6. Test the Integration

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to the dashboard
3. You should see the loading state briefly, then the dashboard with client data from Supabase

## Database Schema

### Tables Created

#### `clients`

Stores all client information including:

- Personal details (name, email, age, etc.)
- Portfolio information
- Performance metrics
- Risk profile and preferences

#### `conversations`

Stores client conversation history:

- Call/meeting transcripts
- Summaries and notes
- Duration and type

#### `actions`

Stores client action items:

- Task descriptions
- Priority levels
- Due dates and status

#### `upcoming_events`

Stores client upcoming events:

- Meeting dates
- Event titles

## Features

The integration provides:

- **Real-time data**: All data is fetched from Supabase
- **CRUD operations**: Create, read, update, delete for all entities
- **Loading states**: Proper loading indicators while fetching data
- **Error handling**: Error states with retry functionality
- **Type safety**: Full TypeScript support with proper types

## Hooks Available

### `useClients()`

- Fetches all clients
- Provides CRUD operations for clients
- Handles loading and error states

### `useConversations(clientId?)`

- Fetches conversations for a specific client or all clients
- Provides CRUD operations for conversations
- Handles loading and error states

### `useActions(clientId?)`

- Fetches actions for a specific client or all clients
- Provides CRUD operations for actions
- Includes helper methods for filtering by status/priority
- Handles loading and error states

## Security

The current setup uses the anon key for simplicity. For production:

1. Enable Row Level Security (RLS) in Supabase
2. Create appropriate policies
3. Consider using service role key for server-side operations
4. Implement proper authentication

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Check that your environment variables are correctly set
   - Ensure the anon key is correct

2. **"Failed to fetch clients" error**
   - Verify your Supabase project URL is correct
   - Check that the database schema was created successfully

3. **Empty data**
   - Run the sample data insertion part of the SQL schema
   - Check that the tables were created with data

### Debug Mode

To see detailed error information, check the browser console and network tab for failed requests.

## Next Steps

1. Set up authentication if needed
2. Implement real-time subscriptions for live updates
3. Add data validation and sanitization
4. Set up proper error monitoring
5. Consider implementing caching strategies
