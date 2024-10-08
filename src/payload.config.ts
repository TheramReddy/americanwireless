import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";
import path from 'path'
import { Users } from "./collections/Users";
import { Products } from "./collections/Products/Products";
import { Media } from "./collections/Media";





export default buildConfig({
    serverURL:process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [Users, Products, Media],
    routes:{
        admin: '/sell'
    },

    admin: {
        user: "users",
        bundler: webpackBundler(),
        meta: {
            titleSuffix: '- americanwireless',
            favicon: '/favicon.ico',
            ogImage: '/thumbnail.jpg',
          },
    },
    rateLimit: {
        max: 2000,
      },

    editor: slateEditor({}),
    db: mongooseAdapter({
        url:process.env.MONGODB_URL!,
    }),
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
      },


})