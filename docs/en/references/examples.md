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
tumia fs # to use filesystem operations
data filename = "test.txt"
fs.writeFile(filename, "Hello world")
data content = fs.readFile(filename)
chapisha content
```

---

## 5. Timers & Async (Built-in Module Example)

```swazi
tumia async # to use timer API / and async operations
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
tumia regex kama reg // to use the built in regex API
data s = "abc 123 def 456"
data found = reg.match(s, "\\d+", "g")     // Find all numbers
chapisha found

data replaced = reg.replace(s, "\\d+", "X", "g")
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
```

### Casino Game in SwaziLang 
``` swazi

tumia console // to use console.print() as expresion instead of chapisha <exp> statement
kazi ask(qn) {
  rudisha soma(qn);
}

// -----------------------
// Structures
// -----------------------

muundo Player {
  Player(name, balance) {
    self.name = name;
    self.balance = balance;
    self.choice = "tail"; // head or tail
    self.bet = 0;
  }
}

muundo Game {
  Game(minBet = 1) {
    self.players = [];
    self.round = 0;
    self.minBet = minBet;
  }

  tabia addPlayer(player) {
    self.players.push(player);
  }

  tabia allQuit() {
    rudisha self.players.every(p => p.balance <= 0);
  }

  tabia playRound() {
    self.round += 1;
    chapisha `\n------ Round ${self.round} ------`;
    chapisha `Players: ${self.players.urefu()}`;

    // 1) Each player decides to play or skip
    kwa p katika self.players {
      kama (p.balance <= 0) {
        chapisha (`${p.name} has no money. Skipping...`);
        p.bet = 0;
        endelea;
      }

      chapisha (`\n${p.name} - Balance: ${p.balance}`);
      data yn = ask("Do you want to play? (1=yes, 0=no): ");
      kama (yn === "0") {
        chapisha (`${p.name} decides to skip self round.`);
        p.bet = 0;
        endelea;
      }

      data choice = ask("Choose 1=head or 0=tail: ");
      kama (choice === "1") =>> p.choice = "head";
      sivyo kama (choice === "0") =>> p.choice = "tail";
      sivyo {
        chapisha ("Invalid choice, defaulting to tail.");
        p.choice = "tail";
      }

      data betStr = ask(`Enter bet (min ${self.minBet}): `);
      data betNum = Namba(betStr) || self.minBet;

      kama (betNum < self.minBet) {
        chapisha (`Bet below min. Setting to ${self.minBet}`);
        betNum = self.minBet;
      }
      kama (betNum > p.balance) {
        chapisha (`Not enough balance. Betting all-in: ${p.balance}`);
        betNum = p.balance;
      }

      p.bet = betNum;
      chapisha (`${p.name} bets ${p.bet} on ${p.choice}`);
    }

    // 2) Flip coins and resolve
    chapisha ("\nFlipping coins...");
    kwa p katika self.players {
      kama (p.bet <= 0) =>> endelea;

      data flip = (Hesabu.rand()).kadiria(); // 0 or 1
      data flipStr = flip === 1 ? "head" : "tail";
      chapisha (`${p.name} flipped: ${flipStr}`);
      fanya =>> data tt = 0; wakati tt < 1e3 =>> tt++; # keep a small wait
      
      data won = (flip === 1 && p.choice === "head") || (flip === 0 && p.choice === "tail");

      kama (won) {
        p.balance += p.bet; // win = profit = bet
        chapisha (`✅ ${p.name} won! Bet ${p.bet} => new balance ${p.balance}`);
      } sivyo {
        p.balance -= p.bet;
        chapisha (`❌ ${p.name} lost ${p.bet} => new balance ${p.balance}`);
      }

      p.bet = 0;
      p.choice = "tail"; // reset for next round
    }

    // 3) Show leaderboard
    chapisha ("\n--- Leaderboard ---");
    data thabiti board = [...self.players].panga((a, b) => b.balance - a.balance);
    board.forEach(p => console.print(`${p.name} : ${p.balance}`));
    chapisha ("-------------------\n");
  }
}

// -----------------------
// Setup & Main Loop
// -----------------------

kazi main() {
  data thabiti minBetInput = ask("Enter minimum bet (default 1): ");
  data thabiti minBet = Namba(minBetInput) || 1;
  data thabiti game = unda Game(minBet);

  data thabiti numPlayersInput = ask("Number of players: ");
  data thabiti numPlayers = Namba(numPlayersInput) || 1;

  kwa (i = 1; i <= numPlayers; i++) {
    data thabiti name = ask(`Name of player ${i}: `);
    data thabiti startBalanceInput = ask(`Starting balance of ${name} (default 100): `);
    data thabiti startBalance = Namba(startBalanceInput) || 100;
    game.addPlayer(unda Player(name, startBalance));
  }

  console.print("\nGame start! Let’s go.\n");

  wakati (kweli) {
    kama (game.allQuit()) {
      console.print("No players with money left. Game over.");
      simama;
    }

    data thabiti cmd = ask("Choose: 1=Round, 2=Leaderboard, 0=Quit: ");

    kama (cmd === "0") {
      console.print("\nFinal standings:");
      data thabiti finalBoard = [...game.players].sort((a, b) => b.balance - a.balance);
      finalBoard.forEach(p => console.print(`${p.name} : ${p.balance}`));
      simama;
    } sivyo kama (cmd === "1") {
      game.playRound();
    } sivyo kama (cmd === "2") {
      console.print("\n--- Current leaderboard ---");
      data thabiti board = [...game.players].sort((a, b) => b.balance - a.balance);
      board.forEach(p => console.print(`${p.name} : ${p.balance}`));
      console.print("---------------------------\n");
    } sivyo {
      console.print("Invalid option, try again.");
    }
  }
}

main();

```