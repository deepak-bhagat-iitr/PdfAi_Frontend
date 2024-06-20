# PDFPilot

PDFPilot is a web application that allows users to upload PDF files, ask questions related to the uploaded PDF, and receive answers based on the content of the PDF.

## Features
- Upload PDF files.
- Ask questions related to the uploaded PDF.
- Receive answers based on the content of the PDF.

## Technologies Used
- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect, useRef)
- **Icons**: React Icons
- **Scrolling**: react-scroll-to-bottom
- **HTTP Requests**: Axios

## Setup Instructions
To run PDFPilot locally on your machine, follow these steps:

### Prerequisites
- Node.js installed on your machine
- npm or yarn package manager

### Installation
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd PDFPilot
   ```

2. **Install dependencies:**
   ```bash
   npm install  # or yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   This will run the frontend at `http://localhost:3000`.

### Backend Setup
PDFPilot requires a backend server for PDF processing and answering queries. Make sure the backend server is running and accessible at `http://localhost:8000` before using the frontend.

### Usage
1. **Upload a PDF File:**
   - Click on the upload button (cloud icon) to select a PDF file from your computer.
   - Once uploaded successfully, you will see a confirmation message in the chat area.

2. **Ask Questions:**
   - Type your question in the message input field.
   - Press Enter or click the send button (paper plane icon) to send your question.
   - If a PDF is uploaded and the question is entered, PDFPilot will fetch and display the relevant answer from the backend.


## File Structure
- `src/`: Root directory for all frontend source code files.
  - `src/App.jsx`: Main entry point of the application where the ChatDashboard component is rendered. Handles state management, message sending, PDF upload, and message display.
  - `src/components/`: Directory for reusable components used throughout the application.
    - `src/components/UploadForm.jsx`: Component responsible for uploading PDF files. Includes a file input field and uses Axios for file upload functionality.
    - 

## Credits
- Icons from [React Icons](https://react-icons.github.io/react-icons/).
- Styling with [Tailwind CSS](https://tailwindcss.com/).
