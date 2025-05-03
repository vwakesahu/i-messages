# iMessage API

A Node.js API for sending and retrieving messages via Apple's iMessage service (works locally).

## Introduction

The iMessage API provides a simple interface to interact programmatically with Apple's iMessage system. It allows you to send messages and retrieve your message history through HTTP endpoints. I created this for a hackathon, where I'm building an SMS-based AI agent that interacts with messages. I tried purchasing some messaging APIs from providers, but unfortunately, they all require verification, which takes about 20 hours. Since the hackathon ends in 6 hours, I ended up taking a more hands-on approach and built this myself.

## Prerequisites

- macOS Sequoia 15.4.1 or later
- Node.js 20.x or later
- iPhone with iOS 18.3.2 or later (for SMS functionality)

## Setup Instructions

### System Permissions

1. **Enable Full Disk Access for Terminal**
   - Open System Settings on your Mac
   - Navigate to Privacy & Security
   - Select Full Disk Access
   - Enable Terminal in the list of applications
   - Restart Terminal completely

2. **Enable Text Message Forwarding on iPhone**
   - On your iPhone, go to Settings > Messages
   - Ensure iMessage is turned on
   - Tap on "Text Message Forwarding"
   - Enable your Mac in the list of devices

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/imessage-api.git
   cd imessage-api
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create an environment configuration
   ```
   cp env.sample .env
   ```

4. Edit the `.env` file with your settings
   ```
   # Server Configuration
   PORT=3000
   
   # iMessage Database Path
   DB_PATH=/Users/yourusername/Library/Messages/chat.db
   ```

5. Start the server
   ```
   npm start
   ```

## API Endpoints

### Get All Messages

Retrieves all messages from the iMessage database with pagination.

- **URL**: `/api/messages`
- **Method**: `GET`
- **Query Parameters**:
  - `limit` (optional): Number of messages per page (default: 100)
  - `page` (optional): Page number (default: 1)
  - `direction` (optional): Filter by message direction (`incoming` or `outgoing`)
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "success": true,
      "count": 50,
      "page": 1,
      "limit": 100,
      "data": [
        {
          "id": 123456,
          "timestamp": 1620000000000000,
          "date": "2021-05-03 12:34:56",
          "text": "Hello, how are you?",
          "phoneNumber": "+1234567890",
          "direction": "incoming",
          "contact": {
            "name": "John Doe"
          }
        },
        // More messages...
      ]
    }
    ```

### Get Messages by Phone Number

Retrieves messages from a specific phone number.

- **URL**: `/api/messages/phone/:phoneNumber`
- **Method**: `GET`
- **URL Parameters**:
  - `phoneNumber`: Phone number in international format (e.g., +1234567890)
- **Query Parameters**:
  - `direction` (optional): Filter by message direction (`incoming` or `outgoing`)
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "success": true,
      "count": 25,
      "data": [
        {
          "id": 123456,
          "timestamp": 1620000000000000,
          "date": "2021-05-03 12:34:56",
          "text": "Hello, how are you?",
          "direction": "incoming",
          "contact": {
            "name": "John Doe"
          }
        },
        // More messages...
      ]
    }
    ```

### Send Message

Sends a message to a specified phone number.

- **URL**: `/api/messages/send`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "phoneNumber": "+1234567890",
    "message": "Hello, this is a test message."
  }
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**:
    ```json
    {
      "success": true,
      "data": {
        "phoneNumber": "+1234567890",
        "message": "Hello, this is a test message.",
        "timestamp": "2023-04-25T14:30:45.123Z"
      }
    }
    ```

## Error Handling

All endpoints return standard error responses in the following format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

Common error codes:
- `400`: Bad Request - Missing or invalid parameters
- `500`: Server Error - Database access issues or script execution failures

## Limitations

- The API requires Full Disk Access permissions for Terminal
- Message sending uses UI automation and will momentarily open the Messages app
- Avoid using your computer while a message is being sent to prevent interference
- This API is intended for personal or development use and not for production applications

## License

MIT
