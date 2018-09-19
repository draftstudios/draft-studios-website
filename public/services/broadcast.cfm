<!---
We need to emulate this websocket object... notice the array of "objects" aka structs

       socket.send(                                                                                         JSON.stringify( {
           ns: "coldfusion.websocket.channels",
           type: "publish",
           channel: "cf-summit", // Channel Name
           appName: "cf-summit-2018", //App Name
           data: [{id: 1, asset: "Bird-1.png", x: 400, paradoxratio: 1, imgclass: "bird", color: "red"},{id: 2, asset: "Bird-2.png", x: 600, paradoxratio: 1, imgclass: "bird", color: "yellow"}]
         } )                                                                                     
       );   
--->
<cfheader name="Access-Control-Allow-Origin" value="*">

<cfscript>
function returnRandomHEXColors(numToReturn) {
    var returnList = ""; 
    var colorTable = "A,B,C,D,E,F,0,1,2,3,4,5,6,7,8,9"; // define all possible characters in hex colors
    var i = "";
    var tRandomColor = "";
    for (i=1; i LTE val(numToReturn); i=i+1){
        tRandomColor = "";
        for(c=1; c lte 6; c=c+1){
            tRandomColor = tRandomColor & listGetAt(colorTable, randRange(1, listLen(colorTable)));
        }
        returnList = listAppend(returnList, tRandomColor);

    }
    return returnList;
}
</cfscript>

<cfset assetList = "Duck-Boat.png,Sailboat.png,Train.png,Taxi-Camry.png,Taxi-Prius.png">
<cfset result = ArrayNew(1)>
<cfloop from="1" to="5" index="myInd">
    <cfset struct = {}>
    <!--- NOTE: use array notation here instead of dot for keeping case,
        CF upper-cases struct keys which can be an issue during serializejson step

        <cfset struct.asset = "Bird-1.png"> 
        <cfset struct.x = Rand() * 1000> 
        <cfset struct.paradoxratio = 1> 
        <cfset struct.imgclass = "bird"> 
        --->
    <cfset struct['asset'] = 'Duck-Boat.png'> 
    <!---
        they don't need to be duck-boats...
        --->
    <cfset struct['asset'] = ListGetAt(assetList,myInd)> 
    <cfset struct['x'] = Int(Rand() * 1500)> 
    <cfset struct['paradoxratio'] = 1> 
    <cfset struct['imgclass'] = ""> 
    <cfset struct['color'] = "###returnRandomHEXColors(1)#"> 
    <cfset tmp = ArrayAppend(result, struct)>
</cfloop>

<cfscript>
	threadName = "ws_msg_" & createUUID();
	msg = url.message ? : "";

	if (!msg.len()){
        msg = SerializeJSON(result);
	}

	cfthread(action:"run",name:threadName,message:msg){
		WsPublish("cf-summit",attributes.message);
	}

	writeOutput(msg);
</cfscript>
