# SwaziLang Example Programs

This file contains a variety of practical, idiomatic SwaziLang examples for learners and developers.  
You'll find complete mini-projects, function usage patterns, class-based designs, database-like modeling, event buses, and more.  
Copy, adapt, and use these as building blocks in your own SwaziLang projects!

---

## 1. Todo List Project (Interactive CLI)

```swazi
tumia regex kutoka "regex"

data todos = []

data usg = `
Usage commands: \n
  >>> list — To list all todos
  >>> add — To add new todos (open the prompt)
  >>> remove <id> — To remove a todo (with a specified id)
  ${"_".rudia(40)} \n
  >>> quit — turn off the todo app
  >>> help / h — to see this help again
`
chapisha usg
chapisha "Start todoing..."

data TODO_CUR_ID = 1

kazi add:
  id = TODO_CUR_ID
  title = soma(">>> Weka title: ")
  desc = soma(">>> Weka description: ")
  
  todos.ongeza({ id, title, desc })
  TODO_CUR_ID++

kazi listing:
  kwa kila val,i katika todos:
    chapisha `${Neno(i + 1)}) id: ${Neno(val.id)}, ${val.title}\n => .... ${val.desc}`

kazi namba_sahihi n:
  kama n.nineno:
    kama regex.match(n, "\\D") {
      rudisha sikweli
    }
    rudisha Namba(n).ninamba na !Namba(n).siSahihi
  vinginevyo:
    fanya {
      jaribu:
        rudisha n.ninamba na !n.siSahihi
      makosa err:
        rudisha sikweli
    }

kazi removing line:
  data cmd_arr = line.orodhesha(" ")
  data [cmd, ...ids] = cmd_arr
  kama ids.idadi == 0:
    chapisha "You should use id(s) after rm/remove command"
    rudisha
  kwa kila val,i katika ids:
    kama !namba_sahihi(val):
      chapisha "Invalid Id used, please use numeric id eg. remove 1 2 3"
      rudisha
    data tdi = todos.tafutaIndex(e => e.id == val)
    kama todos.ondoa(todos[tdi]):
      chapisha `Todo yenye id ${val} imeondolowa kwenye orodha.`
      endelea
    vinginevyo:
      chapisha `Huwezi kufuta todo id(${val}), haipo kwenye orodha`
      endelea
  rudisha

wakati kweli:
  data line = soma(`${todos.idadi>0?Neno(todos.idadi):">"}>> `).sawazisha()
  kama line sawa "help" au line sawa "h":
    chapisha usg
    endelea
  kama line sawa "list" au line sawa "l" au line sawa "ls":
    listing()
    endelea
  kama line sawa "add":
    add()
    chapisha "Todo added successifully..."
    endelea
  kama line.orodhesha(" ").kuna("remove") au line.orodhesha(" ").kuna("rm"):
    removing(line)
    endelea
  kama line sawa "quit" au line sawa "q":
    chapisha "quiting..."
    simama
  kama line sawa "":
    endelea
  chapisha "Command not found"
```

---

## 2. Simple Database & Table Modeling (Classes and Instances)

```swazi
muundo Db:
  &db_name
  &tables = {}
  Db(db_name):
    $.db_name = db_name

  tabia add_table(tb_obj):
    $.tables[tb_obj.tb_name] = tb_obj
  &tabia delete_db:
    // logic here
  &tabia rename_db new_name:
    $.db_name = new_name
  &tabia delete_tb(tb_inst):
    $.tables[tb_inst.tb_name] = null

muundo Table:
  &rows = []
  Table(db_instance, tb_name, ...cols):
    $.db_instance = db_instance
    $.tb_name = tb_name
    $.cols = cols
    $.db_instance.add_table($)

  &tabia create(...dt):
    data rowOb = {}
    kwa kila col,i katika $.cols:
      rowOb[col] = dt[i]
    $.rows.ongeza(rowOb)
  &tabia read(id):
    rudisha $.rows.tafuta(r => r.id == id)
  &tabia update(id, ob):
    data entry = $.rows.tafuta(r => r.id == id)
    data nobj = {
      ...entry,
      ...ob
    }
    $.rows.ondoa(entry)
    $.rows.ongeza(nobj)
  &tabia delete(id):
    $.rows.ondoa($.rows.tafuta(r => r.id == id))

data app = unda Db("app")

data user_table = unda Table(app, "users", "id", "name", "married")
data post_table = unda Table(app, "posts", "id", "content", "like_counts")

user_table.create(3, "John Doe", kweli)
user_table.create(5, "Jane Doe", sikweli)

post_table.create(1, "Hello world", 400)

user_table.update(3, {
  name: "Hans Doe",
  married: sikweli
})

app.rename_db("app_db")

chapisha app
```

---

## 3. Event Bus (Simple Pub/Sub)

```swazi
muundo Bus:
  &listeners = {}
  &cache = []
  &tabia emit(evt, ...payload):
    kama !$.listeners[evt]:
      $.cache.ongeza({ evt: evt, payload: payload })
      rudisha
    kwa kila cb katika $.listeners[evt]:
      cb(...payload)
  &tabia on(evt, cb):
    $.listeners[evt] = []
    $.listeners[evt].ongeza(cb)
    kama $.cache.idadi > 0:
      kwa kila e katika $.cache:
        kama e.evt === evt:
          cb(...e.payload)

data bus = unda Bus

bus.emit("evt", "ddd")
bus.emit("evt", "ddd")

bus.on("evt", (p) => {
  chapisha p
})
```

---

## 4. File Operations (Built-in Module Example)

```swazi
tumia "fs"
data filename = "test.txt"
fs.writeFile(filename, "Hello world")
data content = fs.readFile(filename)
chapisha content
```

---

## 5. Timers & Async (Built-in Module Example)

```swazi
tumia "async"
async.setTimeout(2000, () => chapisha "2 seconds passed")
data id = async.setInterval(1000, () => chapisha "Tick")
async.setTimeout(5000, () => async.clearInterval(id))
```

---

## 6. Date & Time Usage (Global and Class API)

```swazi
chapisha muda("YYYY-MM-DD")                  // Format current date

data d = unda Muda(2025, 10, 14, 19, 12, 17) // Create specific date/time
chapisha d.iso()
chapisha d.sikuYaJuma("ddd")                 // Day name

data future = d.ongeza("siku", 5)
chapisha future.fmt("YYYY-MM-DD")
chapisha future.object()
```

---

## 7. Regex Search and Replace

```swazi
tumia "regex"
data s = "abc 123 def 456"
data found = regex.match(s, "\\d+", "g")     // Find all numbers
chapisha found

data replaced = regex.replace(s, "\\d+", "X", "g")
chapisha replaced
```

---

## 8. Array Operations (Member Methods)

```swazi
data arr = Orodha(1, 2, 3)
arr.ongeza(4)
chapisha arr.idadi              // 4
chapisha arr.unganisha(", ")    // "1, 2, 3, 4"
chapisha arr.panga()            // sorts (lexicographically)
chapisha arr.slesi(1, 3)        // [2, 3]
```

---

## 9. String Methods

```swazi
data s = "   Example Text   "
chapisha s.sawazisha()          // "Example Text"
chapisha s.herufiKubwa()        // "   EXAMPLE TEXT   "
chapisha s.herufiNdogo()        // "   example text   "
chapisha s.kuna("Text")         // kweli