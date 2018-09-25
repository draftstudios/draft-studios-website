<cfcomponent displayname="cf-summit" hint="CF Summit 2018 - Draft Studios - Minh Vo">

  <cfsetting requesttimeout="120"/>

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

  <cffunction name="fetch" access="remote" hint="get ColdFusion-controlled assets" returnformat="json">
    <cfargument type="string" name="broadcast" default="1">
    <cfheader name="Access-Control-Allow-Origin" value="*">

        <cfset assetList = "Duck-Boat.png,Sailboat.png,Train.png,Taxi-Camry.png,Taxi-Prius.png">
        <cfset result = ArrayNew(1)>
        <cfloop from="1" to="10" index="myInd">
            <cfset struct = {}>
            <!--- NOTE: use array notation here instead of dot for keeping case,
                CF upper-cases struct keys which can be an issue during serializejson step

                <cfset struct.asset = "Bird-1.png"> 
                <cfset struct.x = Rand() * 1000> 
                <cfset struct.paradoxratio = 1> 
                <cfset struct.imgclass = "bird"> 
                --->
            <cfset struct['asset'] = ListGetAt(assetList,(myInd mod 5)+1)> 
            <cfset struct['x'] = Int(Rand() * 1500)> 
            <cfset struct['paradoxratio'] = 1> 
            <cfset struct['imgclass'] = ""> 
            <cfset struct['color'] = "###returnRandomHEXColors(1)#"> 
            <cfset tmp = ArrayAppend(result, struct)>
        </cfloop>

    <cfreturn result>

  </cffunction>

  <cffunction name="broadcast" access="remote" hint="send a websocket message" returnType="void">
    <cfargument type="string" name="type" default="default">
    <cfheader name="Access-Control-Allow-Origin" value="*">

        <cfset assetList = "Duck-Boat.png,Sailboat.png,Train.png,Taxi-Camry.png,Taxi-Prius.png">
        <cfset result = ArrayNew(1)>
        <cfloop from="1" to="5" index="myInd">
            <cfset struct = {}>
            <cfset struct['asset'] = ListGetAt(assetList,(myInd mod 5)+1)> 
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
  </cffunction>

  <cffunction name="subscribers" access="remote" hint="get websocket subscribers" returnFormat="plain">
    <cfheader name="Access-Control-Allow-Origin" value="*">
        <cfscript>
            result = StructNew();
            topLevelChannels = WSGetAllChannels();
            for (channel in topLevelChannels){
                subChannels = WSGetAllChannels(channel);
                if (subChannels.len()){
                    for (subChannel in subChannels)
                        savecontent variable="result" { 
                            writeDump(label:subChannel,var:WSGetSubscribers(subChannel))
                        }
                } else {
                    savecontent variable="result" { 
                        writeDump(label:channel,var:WSGetSubscribers(channel));
                    }
                }
            }
        </cfscript>
    <cfreturn result>
  </cffunction>

</cfcomponent>
