import pty from "node-pty"


const child = pty.spawn("swazi", ["-i"])

child.on("data", (data) => {
  process.stdout.write(data)
})

child.on("exit", code => console.log(code))

child.write("\ndata x = 8\n")
child.write("\nchapisha x\n")
child.write("\nchapisha x\n")