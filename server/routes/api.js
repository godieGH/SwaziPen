import { Router } from "express"
import chalk from "chalk"
import fs from "fs-extra"
import path from "path"

const router = Router()

router.get("/", (req, res) => {
   res.json(/*req.initialFileTree*/)
})

router.get("/filetree", (req, res) => {
   res.json({
      filetree: [req.initialFileTree]
   })
})

router.post("/get/file/content", async (req, res) => {
   try {
   const { node, parent } = req.body
   const resourcePath = path.join(req.scannedWD, node.path)
   const content = await fs.readFile(resourcePath, "utf8")
   res.json({code: content, meta : {node, parent}})
   } catch (err) {
      console.error(chalk.grey(err.message))
   }
})


export default router