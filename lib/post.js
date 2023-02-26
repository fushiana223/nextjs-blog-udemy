import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { remark } from "remark";
import { html } from "remark-html"

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allpostsData = fileNames.map((fileName) => {
        // .mdの拡張子を取り除く
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName)
        // マークダウンファイルを文字列として読み取る
        const fileContents = fs.readFileSync(fullPath, "utf8")
        // メタデータ部分の解析
        const matterResult = matter(fileContents)
        // idとデータを返却
        return {
            id, ...matterResult.data
        }
    })
    return allpostsData
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, "")
            }
        }
    })
}

export async function getPostData(id) {
    const postsDirectory = path.join(process.cwd(), "posts")
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContent = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContent)
    const blogContent = await remark().use(html).process(matterResult.content)
    const blogContentHTML = blogContent.toString()
    return {
        id, blogContentHTML, ...matterResult.data
    }
}

export function getStaticProps({ params }) {
    params.id
}