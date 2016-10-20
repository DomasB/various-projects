var st = [];
var create = function(str, type,lvl) {
var i = st.length;
st[i] = new Lygtis(str, type,lvl);
}
create("2 H2 (d) + O2 (d) → 2 H2O (d)", "or", 2);
create("NaCl (aq) + AgNO3 (aq) → AgCl (k) + NaNO3 (aq)", "m", 1);
create("N2 (d) + 3 H2 (d) → 2 NH3 (d)", "or", 3);
create("2 HgO (k) → 2 Hg (s) + O2 (d)", "s", 2);
create("S (k) + O2 (d) → SO2 (d)", "or", 1);
create("H2CO3 (aq) ⇆ H2O (s) + CO2 (d)", "s", 1);
create("2 Mg (k) + O2 (d) → 2 MgO (s)", "or", 2);
create("C (k) + O2 (d) → CO2 (d)", "or", 1);
create("2 Na (k) + Cl2 (d) → 2 NaCl (k)", "or", 2);
create("2 P (k) + 3 Cl2 (d) → 2 PCl3 (d)", "or", 3);
create("Ca(OH)2 (k) → CaO (k) + H2O (d)", "s", 1);
create("2 KClO3 (k) → 2 KCl (k) + 3 O2 (g)", "s", 4);
create("2 H2O (s) → 2 H2 (d) + O2 (d)", "e", 2);
create("Fe (k) + CuSO4 (aq) → FeSO4 (aq) + Cu (k)", "p", 1);
create("Cr2(SO4)3 (aq) + 3 Br2 (aq) + 16 NaOH (aq) → 2 Na2CrO4 (aq) + 6 NaBr (aq) + 3 Na2SO4 (aq) + 8 H2O (s)", "or", 5);
create("MnO2 (k) + Br2 (aq) + 4 KOH (aq) → K2MnO4 (aq) + 2 KBr (aq) + 2 H2O (s)", "or", 4);





function Lygtis(str, type, lvl){
   this.str = str;
   var data = this.str.split(" "); 
   this.type = type;
   this.lvl = lvl;
   this.lyg = function() {
        if(ifchk("chb1") === false) {
            for (var i = 0; i < data.length; i++) {
                if(parseInt(data[i],10)) {
                    data[i] = "";
                } else {
					var char = data[i].split("");
					if(char[0] != "(" && char[0] != "→" && char[0] != "⇆" && char[0] != "+") {
						data[i] = "__ " + data[i];
                } 
				}
            }
        }    
    };
    this.bus = function() {
        if(ifchk("chb2") === false) {
            for (var i = 0; i < data.length; i++) {
                var char = data[i].split("");
                if(char[0] == "(") {
                    data[i] = "";
                }
            }
        }    
    };
    this.sub = function() {
        for (var i = 0; i < data.length; i++) {
            var char = data[i].split("");
            if (isNaN(parseFloat(char[0]))) {
                for(var a = 0; a < char.length; a++) {
                    if (!isNaN(parseFloat(char[a]))) {
                        char[a] = "<sub>" + char[a] + "</sub>";
                    }
                }
            data[i] = char.join("");      
            }
        }
    };
    this.prod = function() {
        if(ifchk("chb3") === false) {
            for (var i=0; i<data.length; i++) {
                if(data[i] == "→"||data[i] == "⇆") {
                    data = data.slice(0,i+1);
                    }
            }    
        }
    };
	this.prints = function () {
		data = this.str.split(" ");
		this.lyg();
		this.bus();
		this.sub();
		this.prod();
		return data.join(" ");
	};
}

var printall = function (id) {
	document.getElementById("main").innerHTML = "";
	if (document.getElementById("lvl2").value > document.getElementById("lvl1").value && id == "lvl2") {
		document.getElementById("lvl1").value = document.getElementById("lvl2").value;
	}
	if (document.getElementById("lvl2").value==0 && id == "lvl2") {
		document.getElementById("lvl1").value = 0;
	}
	if (document.getElementById("lvl2").value > document.getElementById("lvl1").value && id == "lvl1") {
	document.getElementById("lvl2").value = document.getElementById("lvl1").value;
	}
	if (document.getElementById("lvl1").value == 1 && id == "lvl1") {
	document.getElementById("lvl2").value = 1;
	}

	if (document.getElementById("lvl1").value != 0 && document.getElementById("lvl2").value != 0 ) {
		document.getElementById("slider").innerHTML = document.getElementById("lvl2").value + "-" + document.getElementById("lvl1").value;
	} else {
		document.getElementById("slider").innerHTML = "Visi";
	}

	var val1 = document.getElementById("lvl1").value
	var val2 = document.getElementById("lvl2").value

	for (var i = 0; st.length > i; i++) {
		if (ifchk(st[i].type) && ((val1 >= st[i].lvl && val2 <= st[i].lvl) || val2 == 0)) {
		document.getElementById("main").innerHTML =  document.getElementById("main").innerHTML + "<br />" + st[i].prints();
		}
	}

};

function shuffle(o){ 
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    printall();
};

var ifchk = function(id) {
 if (document.getElementById(id).checked) {return true;}
 else {return false;}
};
var prnt = function() {
var prtContent = document.getElementById("main");
var WinPrint = window.open('', '', 'letf=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
WinPrint.document.write(prtContent.innerHTML);
WinPrint.document.close();
WinPrint.focus();
WinPrint.print();
WinPrint.close();
}