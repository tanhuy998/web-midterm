
function SetCookie(cname, cvalue, exdays,cpath) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + cpath;
}

function DeleteCookie(cName) {
    document.cookie = cName + "= ," + "; expires = Thu, 01 Jan 1997 00:00:00 UTC; path=/" ;
}

function DeleteCartProduct(cName) {
    DeleteCookie(cName);
    
    console.log(cName);
}


function GetCookieValue(cname) {
    //var name = cname + "=";
    //var decodedCookie = decodeURIComponent(document.cookie);
    //var ca = decodedCookie.split(';');
    // for(var i = 0; i <ca.length; i++) {
    //     var c = ca[i];
    //     while (c.charAt(0) == ' ') {
    //         c = c.substring(1);
    //     }
    //     if (c.indexOf(name) == 0) {
    //         return c.substring(name.length, c.length);
    //     }
    // }

    var cookie = document.cookie;
    var list = cookie.split("; ");

    for (i = 0; i < list.length; ++i) {
        var nameValue = list[i].split("=");
        if (nameValue[0] == cname) return nameValue[1];
    }
    return "";
}

function AddCartProductCookie(pName, pPrice, pQuantity, img, path) {
    var total = pQuantity*pPrice;
    var pValue = pPrice + "-" + pQuantity + "-" + total.toString() + "-" + img + "-" +path;    
    console.log("setcookie");
    SetCookie(pName, pValue, 1, "");
}

function PrintProductsToCartTable() {
    var cookie = document.cookie;
    var productsList = cookie.split("; ");
    console.log(document.cookie);
    var cartTotal = 0;
    var productsCount = productsList.length - 1;

    for ( i = 0; i < productsList.length; ++i) {
        var nameValue = productsList[i].split('=');
        var name = nameValue[0];

        if (name == 'carttotal') { continue;}
        
        var value = nameValue[1].split("-");
        console.log(name);

        // get all attribute of product
        var price = value[0];
        var quantity = value[1];
        var total = value[2];
        var img = value[3];
        var path = value[4];
        SetHTMLTag(name,price,quantity,img,total,path);

        cartTotal += parseInt(total);
        console.log(cartTotal);  
    }

    var cartTotalCValue = cartTotal.toString() + "-" + productsCount.toString();
    SetCookie("carttotal",cartTotalCValue,1,"");
}

function CartTotal() {
    
    var cartValue = GetCookieValue("carttotal").split("-");
    var total = cartValue[0];
    var productCount = cartValue[1];
    console.log(total);

    document.getElementById("#amount").innerHTML += total;
    document.getElementById("#count").innerHTML += productCount;
}

function SetHTMLTag(className,price,quantity,img,total,path) {
    console.log("sethtml");
    var id = GetHashCode(className);
    console.log(id);
    var cookie = "\'" + className + "\'" + "," + price + "," + "GetCartQuantity(\'" + className + "\')" + "," + "\'" + img + "\'" + "," + "\'" + path + "\'";
    var tag =  "<tr class=" + "\"" + className + "\"" + "><td class=\"product-remove\" onclick=\"\"><a title=\"Remove this item\" class=\"remove\"  href=\"#\" onclick=\"DeleteCartProduct(\'" + className +"\');window.location.reload();\">×</a> </td> <td class=\"product-thumbnail\"><a href=\"#\"><img width=\"145\" height=\"145\" alt=\"poster_1_up\" class=\"shop_thumbnail\" src=\"" + img +"\"></a></td><td class=\"product-name\"><a href=\"" + path + "\">" + className +"</a> </td><td class=\"product-price\"><span class=\"amount\">£"+ price +"</span> </td><td class=\"product-quantity\"><div class=\"quantity buttons_added\"><input type=\"button\" class=\"minus\" value=\"-\"><input id=\"#" + id.toString() +"\" onchange=\"AddCartProductCookie(" + cookie + ")\" type=\"number\" size=\"4\" class=\"input-text qty text\" title=\"Qty\" value=\"" + quantity + "\" min=\"0\" step=0\"1\"><input type=\"button\" class=\"plus\" value=\"+\"></div></td><td class=\"product-subtotal\"><span class=\"amount\">£"+ total +"</span></td></tr>";
    
    var html = document.getElementById("cart-list");
    //html.insertBefore(html, html.childNodes[0]);
    document.getElementById("cart-list").innerHTML += tag;
}



function GetCartQuantity(className) {
    //var id = "#" + className;
    var id = "#" + GetHashCode(className).toString();
    var val = document.getElementById(id).value;
    return val;
}

function GetQuantity(id) {
    var val = document.getElementById(id).value;
    return val;
}
function ReduceQuantity(className) {

}

function GetHashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        var character = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */


// Close the dropdown if the user clicks outside of it
