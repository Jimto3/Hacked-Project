import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        try {
          // 1. Destructure credentials
          const { email, password } = credentials;

          // 2. Fetch user from Supabase (or any DB)
          //    Make sure the "users" table has a "password" column that stores
          //    a hashed password (recommended).
          const {
            data: [user],
            error,
          } = await supabase.from("users").select("*").eq("email", email);

          if (error) {
            console.error("Supabase error:", error);
            return null;
          }

          // If no user found
          if (!user) {
            return null;
          }

          // 3. Compare the provided password with the stored hashed password
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null; // or throw an Error for a custom message
          }

          // 4. Return user object if everything is good
          return {
            id: user.id,
            name: user["first name"] || user.email,
            email: user.email,
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
