import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";
import path from 'path'



export default buildConfig({
    serverURL:process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [],
    routes:{
        admin: '/sell'
    },

    admin: {
        bundler: webpackBundler(),
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        url:process.env.MONGODB_URL!,
    })


})