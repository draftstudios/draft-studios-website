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
                <cfset struct.ratio = 1> 
                <cfset struct.imgclass = "bird"> 
                --->
            <cfset struct['key'] = CreateUUID()>
            <cfset struct['asset'] = ListGetAt(assetList,(myInd mod 5)+1)> 
            <cfset struct['x'] = Int(Rand() * 1500)> 
            <cfset struct['ratio'] = 1> 
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

        <!--- what if we want to go the query route? --->
		<cfset rows = 5>

        <!--- let's make a fake query --->
		<cfset qry = queryNew("key,asset,x,ratio,imgclass,color")>
		<cfloop from="1" to="#rows#" index="i">
			<cfset tmp = queryAddRow(qry, {key: CreateUUID(), asset:ListGetAt(assetList,(i mod 5)+1), x:Int(Rand() * 1500), ratio: 1, imgclass:"", color:"###returnRandomHEXColors(1)#"})>
        </cfloop>

        <!--- dump it so you can see --->
        <cfdump var=#qry#>
		<cfset result = QueryToArray(qry)>

        <cfscript>
            // same code as giancarlo's
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

  <cffunction name="QueryToArray" access="private" hint="transpose query object to something more serializable">
    <!--- ray camden first wrote one of these functions, props to him --->
    <cfargument type="query" name="q">
        <cfset result = ArrayNew(1)>
        <cfset cols = q.columnList>
        <cfset colsLen = listLen(cols)>
        <cfloop from="1" to="#q.recordCount#" index="i">
            <cfset struct = {}>
            <cfloop from="1" to="#colsLen#" index="k">
				<cfset struct[lcase(listGetAt(cols, k))] = q[listGetAt(cols, k)][i]>
            </cfloop>
            <cfset tmp = ArrayAppend(result, struct)>
        </cfloop>
    <cfreturn result>
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

  <cffunction name="broadcastWorldBoss" access="remote" hint="send a websocket message" returnType="void">
    <cfargument type="string" name="type" default="default">
    <cfheader name="Access-Control-Allow-Origin" value="*">

        <!--- taking things one step further... basically we need to combine these two styles of assets: first one is able to animate using animationclass, second one needs to do the fly-by via imgclass

            <Parallax move={pos} x="5300" animationclass="vegas-bellagio-slides" floor={this.state.floor} ratio="1" opacity="1" color="transparent" asset="Spacer.png"/>
            <Parallax x="0" floor={this.state.street} maxheight="15vh" color="transparent" ratio="1.5" asset="Taxi-Prius.png" imgclass="prius"/>
        --->

        <cfset assetList = "Vegas-Sheila-Slides.png,Molly-Slides.png">
        <cfset result = ArrayNew(1)>
            <cfset struct = {}>
            <cfset struct['key'] = CreateUUID()>
            <!--- didn't have time to re-arrange, so cheating here with an apng animation. 
                alternatively we could have stacked divs with separate css animations to achieve same effect --->
            <cfset struct['asset'] = ListGetAt(assetList,Second(Now()) MOD 2 + 1)>
            <cfset struct['x'] = "0">
            <cfset struct['ratio'] = 1> 
            <cfset struct['imgclass'] = "worldboss"> 
            <cfset struct['color'] = "transparent"> 
            <cfset tmp = ArrayAppend(result, struct)>

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

</cfcomponent>
