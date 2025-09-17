# language: SwaziLang, ext: .ls | .swz

# single-line comment
data x = 5;
data thabiti a = 100;
data b = "hello world";
data c = kweli;
data d = sikweli;

// c-like body
kazi ddd arg1, arg2, arg3 {
   // sungle-line comment too
   // sungle-line comment too
   // return statement
   rudisha val
}

// python like functions
kazi ccc arg1, arg2 :
   /*
   indendented body
   */
   rudisha (arg2 + arg2)

ddd(a, b, c, arg1, "hello world") // fanction calls

/*
   mult-line comment
   line
   line
*/

// c-style ifStatement
kama cond1 {
   // body
} vinginevyo kama cond2 {
   // else-if body
} vinginevyo {
   // else body
}

// pythonic style indendented ifStatement
kama cond :
   //body
   //body
vinginevyo:
   // else body

kwa(a=0;a<num;a++) {} // c-style for loop
//pythonic style too
kwa(a=0;a<num;a++):
   // body

wakati cond {} // c-style while loop
wakati cond :
   // pythonic style

fanya {
   // c-style do-while
} wakati cond
//pythonic style
fanya:
   // body
wakati cond

// not conditions can be wrapped in () or not except the kwa loop where () is must

//ternary
data f = cond ? conc : alt

// operational keywords
data p = x sawa 5 // return kweli assign it to p if x == 5
data p = x sisawa 5 // same as !=
data p = (x na a) au (x && p) // all this is valid na = &&, au = || , na and au are just op keywords not signs
data thabiti j = 5  // thabiti is const keyword for constant variable

// and all other operational signs like +, **, *, /, &&, ||, <, etc 

chapisha "hello world" // print built-ins
chapisha("hello world", "hello world")
andika 5 // other print fanctionality but with no new line in mind
andika(4, "text")

// note tabia hazina pythonic indendentantion they are c-style only not like kazi
// object data types like js objects or pythonic dics
data ob = {
   "name": "John Doe",
   "age": 30,
   "isMarried": kweli,
   tabia ggg arg1, arg2 {
      // body
   }
   tabia thabiti fff arg1 {
      $.name = arg1 // the interpreter will raise an error for this method can't change nothing
      // body, can't change no member propertis it is a getter
      rudisha $ // means self or this object for method chaining
   }
}

ob.name = "Jane Doe"
ob["name"] = "Jane Doe" //this is valid too, to access members, you can use it ti change value directly
/*
   the below approach is allowed you can store and call later
*/
data b = ob.ggg 
b()
ob.fff(a, b, c)


// arrays, creates array
data arr = [a, b, c, d];
//accessing with arr[0], arr[1]
arr[0] = "A"
arr[0] = kweli

// other things that will be supported later
data ob = Kamusi({
   "name": "John Doe", // just like normal objects
}) // create objects / dics
// built in classes
data set = unda Seti({a, b, c}) // a set of unique element
data map = unda Ramani(); // just like Map() in js


# not we don't use indendentantion on classes dfn, only use indendentantion in the above codes,
# you can only use the indendented above codes (kwa, kama, ...) inside a c-style tabia, but the tabia and Class constructors and destructors don't support pythonic indendentantion
muundo ClassName rithi ClassName {
   // members
   a = 6; // predefined members
   b; // predefined member but not necessary the constructor can build them
   @f; // private member
   &k = 5; // static member belong to a class
   
   //tabia
   ClassName arg, arg { // it is a constructor to build the object
      // constructor called when a class is made
      $.a = arg;
      $.b = arg;
      $.@k = arg; // private member
   }
   ~ClassName arg, arg {
      // destructor , called when an object is destroyed, normally when it is out of scope or program ended or even manually(thats why it takes args for manual termination)
   }
   
   //define methods with tabia keyword
   tabia fff arg, arg2 {
      // body
   }
   tabia @fff {
      // private method
   }
   tabia &fff {
      // static method
   }
   // a method can be static and private 
   tabia &@fff {} // the order of & and @ doesn't matter
   
   // the thabiti keyword on method can be used to ensure that tabia is a getter can't be used to mdify something
   tabia thabiti fff arg1, arg2, {
      $.a = arg2 // this would raise an error
      rudisha $.a // valid
      rudisha  $ // the $ is like this or self to return the object created for method chaining
   }
}

//initiating a class object
data obj = unda ClassName(); // calling the constructor with no args, unda is keyword for creating new objects, it is like new in js
obj.a = 5 // reasign unprotected members
obj.ccc(arg) // calling tabia ccc
data k = ClassName::k // accessing static members
data p = ClassName.k // also valid
data fn = ClassName::fff // accessing and assigning static method
data p = ClassName.fff // also valid
fn(arg) // calling it
// or
ClassName.fff() // this is also valid, just get and call
ClassName::fff(arg) // this is valid


/*
   instances are destroyed as the get out of scope scope, body eg. kazi, kama, vinginevyo, kwa, 
   or they if they were made globally they can be destroyed manually to clean spaces or wait untill program ends
   when a instance is destroy the destructor is called
   nothing will happen if it is called on program end but if scope you might see changes
   if manually you'll will see changes
*/
futa obj // to destroy an instance manually, it will return the destructor return value if not nothing is returned that is void return


//unary keywords
data type = AINAYA sikweli // returns boolean
data type = AINAYA 30 // returns nambari
data type = AINAYA "hello world" // returns neno
data type = AINAYA fff // returns kazi
data type = AINAYA arr // returns listi
data type = AINAYA ob // returns object
data type = AINAYA ClassName // returns muundo
data b = 60 NINAMBARI // returns kweli
data c = "hello world" NINENO// returns true 
data d = kweli NIBOOLEAN // returns kweli
data f = fff NIKAZI
data g = arr NILISTI



//async

//using subiri inside kazi body or tabia body makes the whole fn or mthod async
kazi fname arg, arg2:
   subiri call() // valid await
   subiri data a = call() // valid await
   data a;
   subiri a = call() // valid
   


//modularity
tumia * kutoka "modyula" //all of the exports
tumia aaa, {a, b, c} kutoka "modyula" // named and default exports
tumia {a, b, c} kutoka "modyula"
tumia ggg kama b  kutoka "modyula" //valid

//exports
kazi ppp arg {
   
}
//shoule be at the end of the file, if ruhusu is at the middle the execution of that file ends there code past ruhusu won't be executed
//ruhusu is like rudisha (return) it behaves that the excution file as it functional body
ruhusu {ppp} //valid for named exports
ruhusu {
   p: ppp,
   g: d
} //valid for named exports
ruhusu ppp // valid default export
ruhusu(ppp) // not valid

// with rudisha you can export anything of identifier eg.

data a = 6;
//at the the end you can include a as exported value
rudisha {a, ...others}



//error handling
jaribu {
   // you can  that throws exceptions
   onesha unda Makosa("...") // create an object to throw
   data err = unda MakosaYaAina("...") // create an object to throw
   data err = unda MakosaYaMrejeo("...") // create an object to throw
   data err = unda MakosaYaMpangilio("...") // create an object to throw
   onesha err
   //onesha is the keyword used to throw errors/exceptions
} kamata(err) {
   // catch exceptions
} kisha {
   // finally executed when the above is done
}
   