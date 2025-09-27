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

kwa kila x katika Iterable :
    chapisha x

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

//the fanya keyword can also be used without wakati
fanya {
  // this code will run only once
}

// note: conditions can be wrapped in () or not.  except with the kwa loop where () is must

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

ob.k++ // valid
ob.k += 4 // valid

// arrays, creates array
data arr = [a, b, c, d];
//accessing with arr[0], arr[1]
arr[0] = "A"
arr[0] = kweli
arr[1]++
arr[6] -= 5

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
   &@tabia fff {} // the order of & and @ doesn't matter
   
   // the thabiti keyword on method can be used to ensure that tabia is a getter can't be used to mdify something, no args
   tabia thabiti fff {
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
data type = ainaya sikweli // returns bool
data type = ainaya 30 // returns namba
data type = ainaya "hello world" // returns neno
data type = ainaya fff // returns kazi
data type = ainaya arr // returns orodha
data type = ainaya ob // returns object
data type = ainaya ClassName // returns muundo
data b = 60 NINAMBA // returns kweli
data c = "hello world" NINENO// returns true 
data d = kweli NIBOOL // returns kweli
data f = fff NIKAZI
data g = arr NIORODHA



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
   onesha Makosa("...") // create an object to throw
   data err = unda MakosaYaAina("...") // create an object to throw
   data err = unda MakosaYaMrejeo("...") // create an object to throw
   data err = unda MakosaYaMpangilio("...") // create an object to throw
   onesha err
   //onesha is the keyword used to throw errors/exceptions
} makosa err {
   // catch exceptions
} kisha {
   // finally executed when the above is done
}



//lambda functions

data add = a => a * 3
data add = a, b, c => {
   rudisha a + b + c
} // can have no () on args when just declared
call(a => {
   chapisha a
}, kweli) // if passed as arg can have no () if one arg
kazi call cb, t {
   kama t {
      cb(6, 9, 5)
   }
}

// passing lambda as callback
call((a, b, c) => a) // just like js arrow fn, if more args in callback use () 


// the word ni a syntax sugar 
//eg. that will evaluate cond and assign it to x so  the kama takes x as its condition
kama x ni cond :
  // code 
  // x is available in this scope as kweli
vinginevyo:
  // x is available in this scope as sikweli

//can also be used anywhere else eg.
x ni 5
// makes 5 a truthy value and assign the kweli /sikweli to x this makes x available to the scope that statement was made
// x ni null is like saying data x = Booleanize(null) and make x available to the scope it is initially stated
// used in loops while
fanya :
  // x is available in here as true
  // can change x up here to stop the loop conditionally
  kama cond :
    x = sikweli // that stops the loop
wakati x ni 5 == 5 


//std input just like pythonic
//eg.
data x = ?("Andika jina lako: ") // this will stop execution and wait for user to input the data
// all inputs are strings data type even if user inputs numbers they will be string devs. have to do data type conversion manually in there code


// switch conditions, support both {} and : blocks
chagua cond:
  ikiwa val1:
    fanya {
      
    } // remember i told you fanya is a loop that execute just once here is how you can utilize it
    simama; // breaks the witch 
  ikiwa val2:
    chapisha 555
    chapisha 555 // you can also not use fanya it just a syntax sugar for understanding semantics
    simama;
  ikiwa val3 {
    // eg. with c-style blocks, still valid
  }
  ikiwa val4 {
    simama;
  }
  kaida:
    // this is default case
    simama;// might not be used if it is at the end but best practice to breake a case
  
  
  
  
  
  
