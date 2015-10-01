/*\

title: $:/plugins/felixhayashi/tiddlymap/js/startup/listener
type: application/javascript
module-type: startup

@module TiddlyMap
@preserve

\*/
(function(){"use strict";var e=require("$:/plugins/felixhayashi/tiddlymap/js/NodeType").NodeType;var t=require("$:/plugins/felixhayashi/tiddlymap/js/EdgeType").EdgeType;var a=require("$:/plugins/felixhayashi/tiddlymap/js/utils").utils;var p=function(){this.adapter=$tw.tmap.adapter;this.wiki=$tw.wiki;this.logger=$tw.tmap.logger;this.opt=$tw.tmap.opt;this.dialogManager=$tw.tmap.dialogManager;a.addListeners({"tmap:tm-remove-edge":this.handleRemoveEdge,"tmap:tm-load-type-form":this.handleLoadTypeForm,"tmap:tm-save-type-form":this.handleSaveTypeForm,"tmap:tm-create-type":this.handleCreateType,"tmap:tm-create-edge":this.handleCreateEdge,"tmap:tm-suppress-dialog":this.handleSuppressDialog,"tmap:tm-generate-widget":this.handleGenerateWidget,"tmap:tm-download-graph":this.handleDownloadGraph,"tmap:tm-manage-edge-types":this.handleOpenTypeManager,"tmap:tm-manage-node-types":this.handleOpenTypeManager,"tmap:tm-cancel-dialog":this.handleCancelDialog,"tmap:tm-confirm-dialog":this.handleConfirmDialog},$tw.rootWidget,this)};p.prototype.handleCancelDialog=function(e){a.setField(e.param,"text","")};p.prototype.handleConfirmDialog=function(e){a.setField(e.param,"text","1")};p.prototype.handleSuppressDialog=function(e){if(a.isTrue(e.paramObject.suppress,false)){a.setEntry(this.opt.ref.sysUserConf,"suppressedDialogs."+e.paramObject.dialog,true)}};p.prototype.handleDownloadGraph=function(e){var t=this.adapter.getGraph({view:e.paramObject.view});t.nodes=a.convert(t.nodes,"array");t.edges=a.convert(t.edges,"array");var p="$:/temp/tmap/export";a.setField(p,"text",JSON.stringify(t,null,2));$tw.rootWidget.dispatchEvent({type:"tm-download-file",param:p,paramObject:{filename:e.paramObject.view+".json"}})};p.prototype.handleGenerateWidget=function(e){if(!e.paramObject)e.paramObject={};var t={dialog:{preselects:{view:e.paramObject.view||this.opt.misc.defaultViewLabel}}};this.dialogManager.open("getWidgetCode",t)};p.prototype.handleRemoveEdge=function(e){this.adapter.deleteEdge(e.paramObject)};p.prototype.handleCreateEdge=function(e){var t={from:this.adapter.makeNode(e.paramObject.from).id,to:this.adapter.makeNode(e.paramObject.to).id,type:e.paramObject.label,id:e.paramObject.id};this.adapter.insertEdge(t);$tw.tmap.notify("Edge inserted")};p.prototype.handleOpenTypeManager=function(e){if(!e.paramObject)e.paramObject={};var t=e.type.match(/tmap:tm-(.*)/)[1];if(t==="manage-edge-types"){var a="Edge-Type Manager";var p=this.opt.selector.allEdgeTypesByLabel}else{var a="Node-Type Manager";var p=this.opt.selector.allNodeTypesByLabel}var i={mode:t,topic:a,filter:p+" +[search:title{$:/temp/tmap/MapElementTypeSearch}]"+" +[sort[title]]"};var r=this.dialogManager.open("MapElementTypeManager",i);if(e.paramObject.type){this.handleLoadTypeForm({paramObject:{mode:t,id:e.paramObject.type,output:r.fields["output"]}})}};p.prototype.handleLoadTypeForm=function(p){var i=p.paramObject.output;var r=p.paramObject.mode==="manage-edge-types"?new t(p.paramObject.id):new e(p.paramObject.id);r.save(i);if(p.paramObject.mode==="manage-edge-types"){var d=this.adapter.selectEdgesByType(r);var o=Object.keys(d).length;a.setField(i,"temp.usageCount",o)}$tw.wiki.addTiddler(new $tw.Tiddler(a.getTiddler(i),{"temp.idImmutable":r.isShipped?"true":"","temp.newId":r.id,"vis-inherited":JSON.stringify(this.opt.config.vis)}));a.deleteByPrefix("$:/state/tabs/MapElementTypeManager")};p.prototype.handleSaveTypeForm=function(p){var i=a.getTiddler(p.paramObject.output);if(!i)return;var r=p.paramObject.mode;var d=r==="manage-edge-types"?new t(i.fields.id):new e(i.fields.id);if(a.isTrue(i.fields["temp.deleteType"],false)){this.deleteType(r,d,i)}else{this.saveType(r,d,i)}};p.prototype.deleteType=function(e,t,p){this.logger("debug","Deleting type",t);if(e==="manage-edge-types"){this.adapter._processEdgesWithType(t,{action:"delete"})}else{this.adapter.removeNodeType(t)}this.wiki.addTiddler(new $tw.Tiddler({title:a.getTiddlerRef(p)}));$tw.tmap.notify("Deleted type")};p.prototype.saveType=function(t,p,i){var r=a.getTiddler(i);p.loadFromTiddler(r);if(p instanceof e){}p.save();if(!r.fields["temp.newId"]){a.setField(r,"temp.newId",r.fields["id"])}else if(r.fields["temp.newId"]!==r.fields["id"]){if(t==="manage-edge-types"){this.adapter._processEdgesWithType(p,{action:"rename",newName:r.fields["temp.newId"]})}a.setField(r,"id",r.fields["temp.newId"])}$tw.tmap.notify("Saved type data")};p.prototype.handleCreateType=function(a){var p=a.paramObject.id||"New type";var i=a.paramObject.mode==="manage-edge-types"?new t(p):new e(p);i.save();this.handleLoadTypeForm({paramObject:{id:i.id,mode:a.paramObject.mode,output:a.paramObject.output}})};p.prototype.getTypeFromEvent=function(a){return a.paramObject.mode==="manage-edge-types"?new t(a.paramObject.id):new e(a.paramObject.id)};exports.name="tmap.listener";exports.platforms=["browser"];exports.after=["rootwidget","tmap.caretaker"];exports.before=["story"];exports.synchronous=true;exports.startup=function(){new p}})();