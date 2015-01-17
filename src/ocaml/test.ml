module Html = Dom_html

let () =
  begin
    (* prints a message in the javascript console *)
    Firebug.console##log (Js.string "Console message from ocaml");
    (* pops an alert window *)
    Html.window##alert (Js.string "Alert window from ocaml");
    (* access a variable content from lib.js *)
    Firebug.console##log_2 (Js.string "x: ",
                            Js.Unsafe.variable "x");
    (* call f() from javascript *)
    Firebug.console##log_2 (Js.string "f()",
                            Js.Unsafe.fun_call (Js.Unsafe.variable "f") [||]);
    (* call g(3) from javascript *)
    Firebug.console##log_2 (Js.string "g(3)",
                            Js.Unsafe.fun_call (Js.Unsafe.variable "g") [|Js.Unsafe.inject 3|]);
    (* create an object "Dog" from javascript lib.js and pass parameter 128 *)
    (* Js.Unsafe.inject allow different types in an array *)
    
    let d = Js.Unsafe.new_obj (Js.Unsafe.variable "Dog") [|Js.Unsafe.inject 128|] in
    (* create an object "Car" from javascript lib.js without parameter *)
    let c = Js.Unsafe.new_obj (Js.Unsafe.variable "Car") [||] in
    (* call function bark on instance d of javascript object "Dog" with parameter "ocaml bark" *)
    
    d##bark((Js.string "ocaml bark"));
    (* log attribute "age" of instance "d" of javascript object "Dog" *)
    Firebug.console##log_2 (Js.string "dog.age: ",
                            d##age);
    (* log attribute "wheels" of instance "c" of javascript object "Car" *)
    Firebug.console##log_2 (Js.string "car.wheels: ",
                            c##wheels);
    (* log attribute "speed" of instance "c" of javascript object "Car" *)
    Firebug.console##log_2 (Js.string "car.speed: ",
                            c##speed);
    (* log return value of function "getSpeed()" of instance "c" of javascript object "Car" *)
    Firebug.console##log_2 (Js.string "car.getSpeed(): ",
                            c##getSpeed());
    (* log attribute "reads" of instance "c" of javascript object "Car" *)
    Firebug.console##log_2 (Js.string "car.reads: ",
                            Js.bool c##reads);
    (* modify attribute "reads" from instance "c" of javascript object "Car" *)
    c##reads <- true;
    (* log attribute "reads" of instance "c" of javascript object "Car" *)
    Firebug.console##log_2 (Js.string "car.reads: ",
                            Js.bool c##reads);
  end