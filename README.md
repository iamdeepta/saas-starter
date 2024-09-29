## Getting Started

```bash
git clone https://github.com/leerob/next-saas-starter
cd next-saas-starter
pnpm install
```

## Running Locally

Use the included setup script to create your `.env` file:

```bash
pnpm db:setup
```

Then, run the database migrations and seed the database with a default user and team:

```bash
pnpm db:migrate
pnpm db:seed
```

This will create the following user and team:

- User: `test@test.com`
- Password: `admin123`

You can, of course, create new users as well through `/sign-up`.

Finally, run the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## APPROACH

1. Have done the blog collection with advanced filtering, but couldn't start the role based authorization.
2. First of all I have setup and run the project following the instruction given in the readme file.
3. As for data table I have used ant design library.
4. For blogs and tags I have made some dummy json data.
5. To maintain the design consistency I have used radix ui elements and the theme color for button.
6. Search can be done by entering title or state or slug.
7. I have put a button against search functionality to optimize the performance of the site.
8. Blogs can be filtered by selecting a tag. The tags list are fetched from the dummy json data.
9. Ant design provides built in sorting mechanism, I have done some tweaks to make it work properly.
10. Ant design library also helps to paginate data by using pagination property where I have played with the current page, page size and total length of the data.
11. I have also maintained the searched data count.
12. All features are made in a way that are suitable for server rendered data.
13. Design is fully responsive.
14. For performance optimization I have used code splitting using lazy and suspense. Also used memoization techniques for functions and components such as useCallback and React.memo and used shouldCellUpdate to update the table cell if the previous and current cell data or components are not same. Image component is used for image optimization.
15. Search field has been made required so that empty field searching does not occur.
16. Moreover to handle large sets of data I have used pagination, each page will load 10 data only.
