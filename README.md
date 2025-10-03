# FunLearn Kids - Learn & Play! 🎓

A fun, colorful learning platform designed specifically for kids in grades 1-5! Upload lessons and turn them into interactive games.

## Features

- 📤 **Easy Upload**: Kids can upload their lesson files (PDF, images, videos)
- 🎮 **Fun Games**: Interactive educational games based on uploaded content
- 🎯 **Grade Levels**: Perfect for grades 1-5 with age-appropriate content
- ⭐ **Star System**: Earn stars and badges for completing activities
- 🌈 **Kid-Friendly Design**: Bright colors, big buttons, and simple navigation
- 📱 **Responsive**: Works great on tablets, computers, and phones

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Font**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd funlearn
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
funlearn/
├── app/                    # Next.js App Router directory
│   ├── about/             # About page
│   ├── courses/           # Courses listing page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Pages

- **Home** (`/`) - Welcome page with grade selection and main navigation
- **Upload** (`/upload`) - Simple file upload interface for kids
- **Play** (`/play`) - Interactive games and educational activities

## Customization

### Styling
The project uses Tailwind CSS for styling. You can customize the design by:
- Modifying `tailwind.config.js` for theme customization
- Updating `app/globals.css` for global styles
- Adding custom components in the `components/` directory

### Content
- Update course data in `app/courses/page.tsx`
- Modify team information in `app/about/page.tsx`
- Customize the hero section in `app/page.tsx`

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue or contact us at support@funlearn.com.
