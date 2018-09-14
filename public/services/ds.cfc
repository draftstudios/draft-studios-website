<!---
{"lines":{"184:BND:61760LAH8:9999":{"COLUMNS":["X","Y"],"DATA":[[16265.697917,4.31],[16266.697917,4.324],[16267.697917,4.294],[16268.697917,4.235],[16269.697917,4.249],[16272.697917,4.205],[16273.697917,4.146],[16274.697917,4.087],[16275.697917,4.146],[16276.697917,4.175],[16279.697917,4.188],[16280.697917,4.16],[16281.697917,4.233],[16282.697917,4.233],[16283.697917,4.188],[16286.697917,4.174],[16287.697917,4.159],[16288.697917,4.114],[16289.697917,4.056],[16290.697917,4.055],[16293.697917,4.055],[16294.697917,4.07],[16295.697917,4.011],[16296.697917,4.04],[16297.697917,3.982],[16300.697917,4.025],[16301.697917,4.01],[16302.697917,3.966],[16303.697917,4.038],[16304.697917,3.995],[16307.697917,3.936],[16308.697917,3.98],[16309.697917,3.95],[16310.697917,3.993],[16311.697917,3.892],[16315.697917,4.066],[16316.697917,4.022],[16317.697917,4.095],[16318.697917,4.153],[16321.697917,4.153],[16322.697917,4.183],[16323.697917,4.167],[16324.697917,4.152],[16325.697917,4.182],[16328.697917,4.196],[16329.697917,4.211],[16330.697917,4.3],[16331.697917,4.195],[16332.697917,4.27],[16335.697917,4.21],[16336.697917,4.225],[16337.697917,4.254],[16338.697917,4.179],[16339.697917,4.164],[16342.697917,4.119],[16343.697917,4.179],[16344.697917,4.089],[16345.697917,4.118],[16346.697917,4.133],[16349.697917,4.103],[16350.697917,4.029],[16351.697917,4.013],[16352.697917,4.013],[16353.697917,3.984],[16357.697917,3.91],[16358.697917,4.012],[16359.697917,3.997],[16360.697917,4.012],[16363.697917,4.011],[16364.697917,4.056],[16365.697917,3.996],[16366.697917,4.114],[16367.697917,4.084],[16370.697917,4.099],[16371.697917,4.097],[16372.697917,4.083],[16373.697917,4.143],[16374.697917,4.173],[16377.697917,4.187],[16378.697917,4.172],[16379.697917,4.187],[16380.697917,4.216],[16381.697917,4.141],[16384.697917,4.201],[16386.697917,4.2],[16387.697917,4.185],[16388.697917,4.155],[16391.697917,4.17],[16392.697917,4.155],[16393.697917,4.184],[16394.697917,4.169],[16395.697917,4.154],[16398.697917,4.138],[16399.697917,4.092],[16400.697917,4.077],[16402.697917,4.032],[16405.697917,4.017],[16406.697917,4.062],[16407.697917,4.061],[16408.697917,4.031],[16409.697917,4.136],[16412.697917,4.06],[16413.697917,4.015],[16414.697917,4.015],[16415.697917,4.015]]}},"_min_x":16265.697917,"_min_x_req":16264,"_max_x":16415.697917,"_max_x_req":16416,"debug":""}
--->

<!---
const refetch = (params) => fetch("data/user.json?params="+params).then(function(response) { 
    return response.json();
}).then(function(rawdata) {
    // freaking date conversions... doing client side for now.
    var data = [];
                                                                     
    for (var key in rawdata.lines) {
        let indata = rawdata.lines[key]; // each one of these are arrays
        indata.forEach((d, i) => {
            let existing = data.filter(function(v, i) { 
                return v.date.getTime() === new Date(d.X * 86400 * 1000).getTime();
            }); 
            
            if(existing.length) {
                let existingIndex = data.indexOf(existing[0]);
                data[existingIndex][key] = +d.Y;
            }
            else {
                let obj = {};
                obj[key] = +d.Y;
                obj['date'] = new Date(d.X * 86400 * 1000);
                //obj['open'] = +d.Y;
                data.push(obj);
            }
            
        });
        //data = data.concat(indata);
    }

    data.sort(function(a, b) {
      return a.date.getTime() - b.date.getTime();
    });
    // i guess CF is handling these ranges?
    rawdata._max_x = new Date(rawdata._max_x * 86400 * 1000);
    rawdata._max_x_req = new Date(rawdata._max_x_req * 86400 * 1000);
    rawdata._min_x = new Date(rawdata._min_x * 86400 * 1000);
    rawdata._min_x_req = new Date(rawdata._min_x_req * 86400 * 1000);

    let xExtents = [rawdata._min_x, rawdata._max_x];
    let altxExtents = [rawdata._min_x, rawdata._max_x];
    let minX = rawdata._min_x_req;
    let maxX = rawdata._max_x_req;

    console.log('reloading data');

    ReactDOM.render(<Chart data={data} xExtents={xExtents} altxExtents={altxExtents} minX={minX} maxX={maxX} type="hybrid" refetch={refetch} />, document.getElementById("chart"));
});

refetch('test');
--->

<!--- saveScreenShot --->

<!---
render() will look something like this typically:

        <SplitPane split="horizontal" resizerStyle={resizerStyle} minSize={40} maxSize={40} enableResizing={false}>
            <div style={appBarStyle}>
              <h4 style={h4Style}><Glyphicon glyph="stats" /> Advanced Charting <p style={{display:'inline-block'}}> <BootstrapLabel><span style={{fontSize: '.75em', color: '#A4DD00',}}>Version 2.0.5</span></BootstrapLabel> <BootstrapLabel bsStyle="danger">"Peter Max"</BootstrapLabel> <BootstrapLabel bsStyle="warning">Pre-alpha</BootstrapLabel> </p> </h4>
                <span style={{width:'100%'}}></span>
                <ButtonToolbar bstyle={btnCustom} sSize="small" style={{whiteSpace:'nowrap', minWidth: '710px', padding: '0px 4px'}}>  
                    <SplitButton style={btnCustom} bsStyle="primary" title={title} bsSize="small" id={3} onClick={function(){console.log(this)}}> 
                      <MenuItem eventKey="1">Action</MenuItem>
                      <MenuItem eventKey="2">Another action</MenuItem>
                      <MenuItem eventKey="3">Something else here</MenuItem>
                      <MenuItem divider />
                      <MenuItem eventKey="4">Separated link</MenuItem>
                    </SplitButton>
                    <BootstrapButton style={btnCustom} bsStyle="success" bsSize="small"><Glyphicon glyph="cloud-download" /> Save Chart</BootstrapButton>
                    <BootstrapButton style={btnCustom} bsStyle="primary" bsSize="small"><Glyphicon glyph="picture" /> Copy Chart</BootstrapButton>
                    <BootstrapButton style={btnCustom} bsStyle="primary" bsSize="small"><Glyphicon glyph="equalizer" /> Copy Chart Data</BootstrapButton>
                    <BootstrapButton style={btnCustom} bsStyle="info" bsSize="small"><Glyphicon glyph="tasks" /> Manage Charts</BootstrapButton>
                    <BootstrapButton style={btnCustom} bsStyle="danger" bsSize="small" onClick={() => this.props.refetch('this')}><Glyphicon glyph="refresh" /> Clear Chart</BootstrapButton>
                </ButtonToolbar>
            </div>
            <SplitPane split="vertical" onChange={size=>this.onChangeLeftBar(size)} defaultSize={this.state.leftBarWidth} minSize={ 275 } maxSize={ 350 }>
                <div>
                    <form>
                        <Securities extents={this.state.altxExtents} onChange={this.onSecuritiesChange}/>
                        {/*
                        <FormGroup controlId="selectDateRange" bsSize="small">
                            <InputGroup>
                                <InputGroup.Button>
                                </InputGroup.Button>
                            </InputGroup>
                        </FormGroup>
<IconButton primary icon="star"><GithubIcon /></IconButton>
                        <FormGroup controlId="selectOutlier" bsSize="small">
                        <InputGroup>
                            <InputGroup.Button>
                                <Slider pinned snaps min={100} max={1000} step={100} editable value={this.state.slider} onChange={this.handleChange.bind(this, 'slider')}/>
                                <Slider pinned snaps min={100} max={1000} step={100} editable value={this.state.slider2} onChange={this.handleChange.bind(this, 'slider2')}/>
                                <Slider pinned snaps min={100} max={1000} step={100} editable value={this.state.slider3} onChange={this.handleChange.bind(this, 'slider3')}/>
                                <Slider pinned snaps min={100} max={1000} step={100} editable value={this.state.slider4} onChange={this.handleChange.bind(this, 'slider4')}/>
                                <Slider pinned snaps min={100} max={1000} step={100} editable value={this.state.slider5} onChange={this.handleChange.bind(this, 'slider5')}/>
                            </InputGroup.Button>
                        </InputGroup>
                        </FormGroup>
                        */}
                    </form>    
                </div>
                <div style={{overflow:"hidden"}} >
                <div ref="container" style={{overflow:"hidden", boxShadow: "0px 5px 10px rgba(0,0,0,0.4)" }}>

                <ChartCanvas width={this.allowedWidth(width-this.state.leftBarWidth)} height={height-90}
                        margin={margin} 
                        type={type}
                        seriesName="MSFT"
                        data={this.state.data} 
                        maxX={this.state.maxX}
                        minX={this.state.minX}
                        calculator={[ema20, ema50, ema200, sma20, sma50, sma200, slowSTO, fastSTO, fullSTO, bb, macdCalculator, rsiCalculator, atr14]}
                        xAccessor={d => d.date} discontinous xScale={xScale}
                        xExtents={this.state.xExtents}
                    >

                    <LabelTitle className={"labeltext"} x={()=>(width-this.state.leftBarWidth - margin.left - margin.right)/ 2} y={()=>10} xPos={(width-this.state.leftBarWidth - margin.left - margin.right)/2} yPos={10}
                        fontSize={30} text={this.state.chartTitle}
                        fill={"#FFFFFF"} chartCanvasType="svg" onChange={(newText) => this.setState({chartTitle: newText})} />

                    {/* <Chart style={{overflow:"hidden"}} id={1} height={this.allowedChartHeight(this.state.slider)} */}
                    <Chart style={{overflow:"hidden"}} id={1} height={this.allowedChartHeight(height-155)}
                            yExtents={d => [d["184:BND:61760LAH8:9999"], d["184:BND:U03169AK2:9999"], d["184:BND:013817AV3:9999"]]}
                            // yExtents can be static... will add
                            //yExtents={d => [51, 39]}
                            padding={{ top: 25, bottom: 50 }}
                            resizeShow={false} //true
                            resizeOnClick={this.handleResizeOnClick.bind(this,'slider')}
                            resizeOnMouseUp={this.handleResizeOnMouseUp.bind(this,'slider')}
                            resizeOnMouseDown={this.handleResizeOnMouseDown.bind(this,'slider')}
                            resizeOnMouseMove={this.handleResizeOnMouseMove.bind(this,'slider',[0, 0])}
                            resizeOnMouseOut={this.handleResizeOnMouseOut.bind(this,'slider',[0, 0])}
                        >

                        {/*
                        <Brush ref="brush"
                            id={0} enabled={true}
                            type={BRUSH_TYPE}
                            onStart={e => console.log("Start Event:", e)}
                            onBrush={this.handleBrush}/>
                                tickStroke="#FFFFFF" stroke="#FFFFFF" label="Yield in USD ($)" labelPadding={50}/>
                        */}

                        <YAxis axisAt="right" orient="right" ticks={5} {...yGrid}
                                tickStroke="#64717e" stroke="#64717e" strokeWidth={1} label="Yield to Worst" labelPadding={50}/>

                        <XAxis axisAt="bottom" orient="bottom" {...xGrid}
                                tickStroke="#64717e" stroke="#64717e" strokeWidth={1} label="Posted Date" labelPadding={28}/>

                        {/*
                        <CandlestickSeries
                                wickStroke={d => d.close > d.open ? "#6BA583" : "#DB0000"}
                                fill={d => d.close > d.open ? "#6BA583" : "#DB0000"} />
                        */}


{/* rem for now
                        <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()} visible={this.state.ema}/>
                        <LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()} visible={this.state.ema}/>
                        <LineSeries yAccessor={ema200.accessor()} stroke={ema200.stroke()} visible={this.state.ema}/>

                        <LineSeries yAccessor={sma20.accessor()} stroke={sma20.stroke()} strokeWidth={"1"} visible={this.state.sma}/>
                        <LineSeries yAccessor={sma50.accessor()} stroke={sma50.stroke()} strokeWidth={"1"} visible={this.state.sma}/>
                        <LineSeries yAccessor={sma200.accessor()} stroke={sma200.stroke()} strokeWidth={"1"} visible={this.state.sma}/>

                        <LineSeries onClick={(e) => alert(e)} yAccessor={d => {if (d["184:BND:61760LAH8:9999"] != null) return d["184:BND:61760LAH8:9999"]}} stroke={"#600363"} strokeWidth={"1"}/>
                        <LineSeries onClick={(e) => alert(e)} yAccessor={d => {if (d["184:BND:U03169AK2:9999"] != null) return d["184:BND:U03169AK2:9999"]}} stroke={"#82a2b8"} strokeWidth={"1"}/>
                        <LineSeries onClick={(e) => alert(e)} yAccessor={d => {if (d["184:BND:013817AV3:9999"] != null) return d["184:BND:013817AV3:9999"]}} stroke={"#ea8c00"} strokeWidth={"1"}/>
                        <LineSeries onClick={(e) => alert(e)} yAccessor={d => {if (d["184:BND:013817AV3:9999"] != null) return d["184:BND:013817AV3:9999"]*1.2}} dashed={true} stroke={"#d70000"} strokeWidth={"1"}/>
*/}

                        <LineSeries onClick={(e) => alert(e)} yAccessor={d => {if (d["184:BND:61760LAH8:9999"] != null) return d["184:BND:61760LAH8:9999"]}} stroke={"chartreuse"} strokeWidth={"2"}/>
                        <LineSeries onClick={(e) => alert(e)} yAccessor={d => {if (d["184:BND:U03169AK2:9999"] != null) return d["184:BND:U03169AK2:9999"]}} stroke={"yellow"} strokeWidth={"2"}/>
                        <LineSeries onClick={(e) => alert(e)} yAccessor={d => {if (d["184:BND:013817AV3:9999"] != null) return d["184:BND:013817AV3:9999"]}} stroke={"dodgerblue"} strokeWidth={"2"}/>
                        <LineSeries onClick={(e) => alert(e)} yAccessor={d => {if (d["184:BND:013817AV3:9999"] != null) return d["184:BND:013817AV3:9999"]*1.2}} dashed={true} stroke={"hotpink"} strokeWidth={"1"}/>


{/*
                        <LineSeries onClick={(e) => alert(e)} yAccessor={d => {if (d["184:BND:013817AV3:9999"] != null) return d["184:BND:013817AV3:9999"]+1}} stroke={"gold"} strokeWidth={"1"}/>
                        <LineSeries onClick={(e) => alert(e)} yAccessor={d => {if (d["184:BND:013817AV3:9999"] != null) return d["184:BND:013817AV3:9999"]+.5}} stroke={"mintcream"} strokeWidth={"1"}/>
                        <LineSeries onClick={(e) => alert(e)} yAccessor={d => {if (d["184:BND:013817AV3:9999"] != null) return d["184:BND:013817AV3:9999"]+.5}} stroke={"fuchsia"} strokeWidth={"1"}/>
                        <LineSeries onClick={(e) => alert(e)} yAccessor={d => {if (d["184:BND:013817AV3:9999"] != null) return d["184:BND:013817AV3:9999"]*1.2}} stroke={"hotpink"} strokeWidth={"1"}/>
*/}
 
                        {/*
                        <LineSeries yAccessor={d => {if (d.close != null) return d.close}} stroke={"#39FF14"} strokeWidth={"1"}/>
                        <LineSeries yAccessor={d => {if (d.high != null) return d.high}} stroke={"yellow"} strokeWidth={"1"} dashed={true}/>
                        <LineSeries yAccessor={d => {if (d.low != null) return d.low}} stroke={"magenta"} strokeWidth={"1"} dashed={true}/>
                        */}

                        <ClickCallback id={0} enabled={true} onClick={ e => { console.log(`mouse position = ${e.mouseXY}`, e); } }/>

                        {/*
                        <BollingerSeries calculator={bb} />
                        */}

                        {/*
                        <CurrentCoordinate id={1} yAccessor={ema20.accessor()} fill={ema20.stroke()} edgeAt={"right"} orient={"right"}/>
                        <CurrentCoordinate id={2} yAccessor={ema50.accessor()} fill={ema50.stroke()} edgeAt={"right"} orient={"right"}/>
                        <CurrentCoordinate id={3} yAccessor={d => d["184:BND:61760LAH8:9999"]} fill={"#600363"} edgeAt={"left"} orient={"left"}/>
                        <CurrentCoordinate id={4} yAccessor={d => d["184:BND:U03169AK2:9999"]} fill={"#82a2b8"} edgeAt={"left"} orient={"left"}/>
                        <CurrentCoordinate id={4} yAccessor={d => d["184:BND:013817AV3:9999"]} fill={"#ea8c00"} edgeAt={"left"} orient={"left"}/>
                        <CurrentCoordinate id={4} yAccessor={d => d["184:BND:013817AV3:9999"]*1.2} fill={"#d70000"} edgeAt={"left"} orient={"left"}/>
                        */}

                        <CurrentCoordinate id={3} yAccessor={d => d["184:BND:61760LAH8:9999"]} fill={"chartreuse"} edgeAt={"left"} orient={"left"}/>
                        <CurrentCoordinate id={4} yAccessor={d => d["184:BND:U03169AK2:9999"]} fill={"yellow"} edgeAt={"left"} orient={"left"}/>
                        <CurrentCoordinate id={4} yAccessor={d => d["184:BND:013817AV3:9999"]} fill={"dodgerblue"} edgeAt={"left"} orient={"left"}/>
                        <CurrentCoordinate id={4} yAccessor={d => d["184:BND:013817AV3:9999"]*1.2} fill={"hotpink"} edgeAt={"left"} orient={"left"}/>

                        {/*
                        <CurrentCoordinate id={4} yAccessor={d => d.close} fill={"#39FF14"} edgeAt={"right"} orient={"right"}/>
                        <CurrentCoordinate id={5} yAccessor={d => d.high} fill={"yellow"} edgeAt={"right"} orient={"right"}/>
                        <CurrentCoordinate id={6} yAccessor={d => d.low} fill={"magenta"} edgeAt={"right"} orient={"right"}/>
                        */}

                        {/*
                        <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                            yAccessor={d => {if (d.open != null) return d.open}} fill={"#000000"}/>

                        <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                            yAccessor={d => {if (d.close != null) return d.close}} fill={"#000000"}/>
                        <EdgeIndicator itemType="first" orient="left" edgeAt="left"
                            yAccessor={d => {if (d.open != null) return d.open}} fill={"#000000"}/>
                        <EdgeIndicator itemType="first" orient="left" edgeAt="left"
                            yAccessor={d => {if (d.close != null) return d.close}} fill={"#000000"}/>
                        */}

                    </Chart>
{/*
                    <Chart height={this.allowedChartHeight(this.state.slider2)}
                            id={2} 
                            yExtents={d => d.volume}
                            origin={(w, h) => [0, this.state.slider-this.state.slider2]} 
                        >
                        <YAxis axisAt="left" orient="left" ticks={5} tickFormat={d3.format("s")} label="Vol" labelPadding={-50}/>
                        <AreaSeries yAccessor={d => {if (d.volume != null) return d.volume}} strokeWidth={"3"}/>
                        <CurrentCoordinate id={7} yAccessor={d => d.volume} fill={"steelblue"} orient={"left"} edgeAt={"left"} displayFormat={d3.format(".4s")}/>
                    </Chart>
                    <Chart id={3} height={this.allowedChartHeight(this.state.slider3)}
                            yExtents={macdCalculator.accessor()}
                            yMousePointerDisplayLocation="right" yMousePointerDisplayFormat={d3.format(".2f")}
                            origin={(w, h) => [0, this.state.slider+50]} 
                            //padding={{ top: 10, bottom: 20 }} 
                            resizeShow={true}
                            resizeOnClick={this.handleResizeOnClick.bind(this,'slider3')}
                            resizeOnMouseUp={this.handleResizeOnMouseUp.bind(this,'slider3')}
                            resizeOnMouseDown={this.handleResizeOnMouseDown.bind(this,'slider3')}
                            resizeOnMouseMove={this.handleResizeOnMouseMove.bind(this,'slider3', [0, this.state.slider+50])}
                            resizeOnMouseOut={this.handleResizeOnMouseOut.bind(this,'slider3',[0, this.state.slider+50])}
                            show={this.state.macd}
                        >
                        <XAxis axisAt="bottom" orient="bottom" {...xGrid} showTicks={false}/>
                        <XAxis axisAt="top" orient="top" {...xGrid} showTicks={false}/>
                        <YAxis axisAt="right" orient="right" ticks={2} />
                        <YAxis axisAt="left" orient="left" showTicks={false}/>
                        <MACDSeries calculator={macdCalculator} fill={"#FFFFFF"}/>
                    </Chart>
                    <Chart id={4} 
                            yExtents={rsiCalculator.domain()}
                            yMousePointerDisplayLocation="right" yMousePointerDisplayFormat={d3.format(".2f")}
                            height={this.allowedChartHeight(this.state.slider4)} 
                            origin={(w, h) => [0, this.state.slider+this.state.slider3+75]} 
                            //origin={(w, h) => [0, h - 350]} 
                            resizeShow={true}
                            resizeOnClick={this.handleResizeOnClick.bind(this,'slider4')}
                            resizeOnMouseUp={this.handleResizeOnMouseUp.bind(this,'slider4')}
                            resizeOnMouseDown={this.handleResizeOnMouseDown.bind(this,'slider4')}
                            resizeOnMouseMove={this.handleResizeOnMouseMove.bind(this,'slider4',[0, this.state.slider+this.state.slider3+75])}
                            resizeOnMouseOut={this.handleResizeOnMouseMove.bind(this,'slider4',[0, this.state.slider+this.state.slider3+75])}
                            show={this.state.rsi}
                        >
                        <XAxis axisAt="bottom" orient="bottom" {...xGrid} showTicks={false}/>
                        <XAxis axisAt="top" orient="top" {...xGrid} showTicks={false}/>
                        <YAxis axisAt="right" orient="right" ticks={2} tickValues={rsiCalculator.tickValues()}/>
                        <YAxis axisAt="left" orient="left" showTicks={false}/>
                        <RSISeries calculator={rsiCalculator} />
                    </Chart>
                    <Chart id={5}
                            yExtents={atr14.accessor()}
                            yMousePointerDisplayLocation="right" yMousePointerDisplayFormat={d3.format(".2f")}
                            //height={this.state.slider5} 
                            height={this.allowedChartHeight(this.props.height-(this.state.slider+this.state.slider3+this.state.slider4+100+100+70))} 
                            origin={(w, h) => [0, this.state.slider+this.state.slider3+this.state.slider4+100]} 
                            //origin={(w, h) => [0, h - 225]} 
                            //padding={{ top: 10, bottom: 10 }} 
                            resizeShow={false}
                            show={this.state.atr}
                        >
                        <XAxis axisAt="bottom" orient="bottom" {...xGrid} showTicks={false}/>
                        <XAxis axisAt="top" orient="top" {...xGrid} showTicks={false}/>
                        <YAxis axisAt="right" orient="right" ticks={2}/>
                        <YAxis axisAt="left" orient="left" showTicks={false}/>
                        <LineSeries yAccessor={atr14.accessor()} stroke={atr14.stroke()} dashed={true}/>
                    </Chart>
*/}

                    <MouseCoordinates xDisplayFormat={d3.time.format("%Y-%m-%d")} stroke="#FFFFFF" opacity={0.4} />
                    <EventCapture mouseMove={true} zoom={true} pan={true} defaultFocus={true} maxX={this.state.maxX} minX={this.state.minX} 
                        onPan={this.handlePan} onZoom={this.handleZoom} onPanEnd={this.handlePanEnd}
                    />

                    <TooltipContainer>
{/*
                        <MACDTooltip forChart={3} origin={[-38, -10]} calculator={macdCalculator}/>
                        <RSITooltip forChart={4} origin={[-38, -10]} calculator={rsiCalculator}/>
                        <SingleValueTooltip forChart={5}
                            yAccessor={atr14.accessor()}
                            yLabel={`ATR (${atr14.windowSize()})`}
                            yDisplayFormat={d3.format(".2f")}
                            valueStroke={atr14.stroke()}
                            labelStroke="#4682B4"
                            origin={[-38, -10]}/>
*/}
                    {/*
                        <MovingAverageTooltip forChart={1} onClick={(e) => console.log(e)} origin={[-38, 5]} 
                            calculators={[ema20, ema50, ema200]} strokeWidth={"4px"}/>
                        <MovingAverageTooltip forChart={1} onClick={(e) => console.log(e)} origin={[-38, 50]} 
                            calculators={[sma20, sma50, sma200]} strokeWidth={"2px"}/>
                    */}
                    </TooltipContainer>


                    <Annotate id={0} chartId={1} with={LabelAnnotation}                                        
                        when={d => bogusTest(d.date, d.newslink) } //d.date.getDate() === this.state.newsData[0].date}
                        usingProps={annotationProps} />

                </ChartCanvas>
            </div>
            

            {/*
                <div>
                    <ChartCanvas width={width} height={175}
                            margin={margin} 
                            type={type}
                            seriesName="MSFT_full"
                            data={data} 
                            calculator={[ema20, ema50]}
                            xAccessor={d => d.date} discontinous xScale={xScale}
                            xExtents={this.state.altxExtents}
                        >
                        <Chart id={1} 
                                height={75} 
                                origin={(w, h) => [0, h - 100]} 
                                yExtents={d => [d.high, d.low]}
                                >

                            <Brush ref="brush"
                                id={0} enabled={true}
                                type={BRUSH_TYPE}
                                onStart={e => console.log("Start Event:", e)}
                                onBrush={this.handleBrush}/>

                            <YAxis axisAt="left" orient="left" ticks={0} {...yGrid}
                                    tickStroke="#FFFFFF" stroke="#FFFFFF"/>

                            <XAxis axisAt="middle" orient="top" showGrid={false} showDomain={true}
                                    tickStroke="#FFFFFF" stroke="#FFFFFF" />

                            <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()} strokeWidth={"1"}/>
                            <LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()} strokeWidth={"1"}/>
                        </Chart>

                        <BrushEventCapture mouseMove={true} zoom={false} pan={true} />
                    </ChartCanvas>
                </div>
            */}

            <div style={bottomBarStyle} className="brush">
                <ButtonToolbar bsSize="small" style={{whiteSpace:'nowrap', minWidth: '290px', maxWidth: '290px', padding: '0px 8px'}}> 
                    <ButtonGroup>
                        <BootstrapButton style={btnCustom} bsStyle="info" bsSize="small" id="1m" data="30" onClick={this.changeExtentState.bind(this, 30)}>1m</BootstrapButton>
                        <BootstrapButton style={btnCustom} bsStyle="info" bsSize="small" id="3m" data="90" onClick={this.changeExtentState.bind(this, 90)}>3m</BootstrapButton>
                        <BootstrapButton style={btnCustom} bsStyle="info" bsSize="small" id="6m" data="180" onClick={this.changeExtentState.bind(this, 180)}>6m</BootstrapButton>
                        <BootstrapButton style={btnCustom} bsStyle="info" bsSize="small" id="YTD" data="30" onClick={this.changeExtentState.bind(this, 'YTD')}>YTD</BootstrapButton>
                        <BootstrapButton style={btnCustom} bsStyle="info" bsSize="small" id="1y" data="360" onClick={this.changeExtentState.bind(this, 360)}>1y</BootstrapButton>
                        <BootstrapButton style={btnCustom} bsStyle="info" bsSize="small" id="5y" data="30" onClick={this.changeExtentState.bind(this, 360*5)}>5y</BootstrapButton>
                        <BootstrapButton style={btnCustom} bsStyle="info" bsSize="small" id="ALL" data="30" onClick={this.changeExtentState.bind(this, 'ALL')}>ALL</BootstrapButton>
                    </ButtonGroup>
                </ButtonToolbar>
                <div style={{marginTop:'4px'}}>
                    <D3Brush
                       width={this.allowedWidth(brushWidth, 'brush')}
                       height={40}
                       margin={{top: 0, bottom: 10, left: 0, right: 0}}
                       xScale={this.minh_scale_X([new Date(1995, 12, 7), this.props.xExtents[1]], this.allowedWidth(brushWidth, 'brush'))}
                       //xScale={this.state.D3xScaleBrush}
                       //extent={this.state.D3xScale.domain()}
                       extent={this.state.altxExtents}
                       onChange={this._onChange}
                    />
                </div>
            </div>

            </div>
            </SplitPane>
        </SplitPane>
--->
