<h1 align="center" style="font-size:50px;"><a href="https://notepage.vercel.app">NotePage</a></h1>  

![frame_generic_light](https://github.com/Varshithvhegde/notepage/assets/80502833/a94e6729-3305-4380-94ea-7f2ac01c81be)

**NotePage** is a web application that allows you to easily share code, text, or any content using a unique link. You can create new note pages by simply visiting `https://notepage.vercel.app`.

### Features

- **Custom Pages**: Create your own custom pages to share content with others. Just use `https://notepage.vercel.app/<your-page-name>` and start sharing.

- **Password Protection**: Optionally protect your pages with a password, ensuring that only authorized users can access your content.

- **Real-time Collaboration**: Collaborate with others in real-time. When multiple users access the same link, any changes made by one user are instantly visible to others, without requiring a page refresh.

- **Shareable Links**: Share your pages with others by sending them the unique link.

### Tech Stack

NotePage is built using the following technologies:

- **Angular**: A powerful and popular front-end framework.

- **Firebase**: A real-time cloud database, authentication, and hosting platform.

- **Angular Material**: A UI component library for Angular applications, providing a set of high-quality components.

- **Nebular**: A customizable Angular UI library and Angular admin template based on Nebular.

### How to Use

1. Visit [https://notepage.vercel.app](https://notepage.vercel.app) to start using NotePage.

2. Create a custom page with your desired name (`https://notepage.vercel.app/<your-custom-name>`).

3. Optionally set a password to protect your page.

4. Start sharing your link with others.

5. Collaborate in real-time with others on your shared content.

### Installation

To run this project locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`

2. Navigate to the project folder: `cd notepage`

3. Install dependencies: `npm install`

4. Add Angular Material and Nebular to the project: `ng add @angular/material` and `ng add @nebular/theme`
   
5. Also ensure that you have added your Firebase configuration in `.env` file.
```env
FIREBASE_PROJECT_ID=<your-project-id>
FIREBASE_APP_ID=<your-app-id>
FIREBASE_DATABASE_URL=<your-database-url>
FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
FIREBASE_API_KEY=<your-api-key>
FIREBASE_AUTH_DOMAIN=<your-auth-domain>
FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
FIREBASE_MEASUREMENT_ID=<your-measurement-id>
```

1. Run the development server: `npm run start`

2. Open your web browser and visit `http://localhost:4200`


Now you can explore and test NotePage on your local machine.

### Support and Contributions

If you encounter any issues or have suggestions for improvements, please open an issue on the [GitHub repository](https://github.com/Varshithvhegde/notepage).

You are also welcome to contribute to the project by forking the repository and creating a pull request.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
