var anchors = {}
anchors["minimap"] = [];
anchors["center"] = [];
anchors["botright"] = [];

function ProgressBar(data)
{
  this.data = data;
  this.value = data.value;
  this.disp_value = data.value;

  this.div = document.createElement("div");
  this.div.classList.add("progressbar");

  this.div_label = document.createElement("div");
  this.div_label.classList.add("label");
  this.div.appendChild(this.div_label);

  this.setText(data.text);

  this.div_inner = document.createElement("div");
  this.div_inner.classList.add("inner");
  this.div.appendChild(this.div_inner);

  this.div_inner.style.zIndex = 1;
  this.div_label.style.zIndex = 2;

  this.div.style.backgroundColor = "rgba("+data.r+","+data.g+","+data.b+",0.3)";
  this.div_inner.style.backgroundColor = "rgba("+data.r+","+data.g+","+data.b+",0.7)";

}

ProgressBar.prototype.setValue = function(val)
{
  this.value = val;
}

ProgressBar.prototype.setText = function(text)
{
  this.div_label.innerHTML = text;
}

ProgressBar.prototype.frame = function(time)
{
  //update display in function of pbar anchor
  var anchor_name = this.data.anchor;
  var anchor = anchors[this.data.anchor];
  if(anchor){
    var anchor_index = anchor.indexOf(this);
    if(anchor_index >= 0){
      if(anchor_name == "minimap"){ //MINIMAP
        var width = cfg.anchor_minimap_width/anchor.length; //divide horizontal map space by number of pbars

        //set size
        this.div.style.width = this.div_label.style.width = (195)+"px";
        this.div_inner.style.height = this.div.style.height = this.div_label.style.height = (7)+"px";
        this.div_label.style.lineHeight = this.div_label.style.height;

        //set label font size
        this.div_label.style.fontSize = "0.5em";

        //set position
        this.div.style.right = (document.body.offsetWidth-this.div.offsetWidth-19)+"px";
        this.div.style.top = (document.body.offsetHeight-190-anchor_index*15)+"px";
      }
      else if(anchor_name == "botright"){ //BOTRIGHT
        //set size
        this.div.style.width = this.div_label.style.width = (200)+"px";
        this.div_inner.style.height = this.div.style.height = this.div_label.style.height = (20)+"px";
        this.div_label.style.lineHeight = this.div_label.style.height;

        //set label font size
        this.div_label.style.fontSize = "1em";

        //set position
        this.div.style.left = (document.body.offsetWidth-this.div.offsetWidth-100)+"px";
        this.div.style.top = (document.body.offsetHeight-120-anchor_index*22)+"px";
      }
      else if(anchor_name == "center"){ //CENTER
        //set size
        this.div.style.width = this.div_label.style.width = (400)+"px";
        this.div_inner.style.height = this.div.style.height = this.div_label.style.height = (100)+"px";
        this.div_label.style.lineHeight = this.div_label.style.height;

        //set label font size
        this.div_label.style.fontSize = "2em";

        //set position
        this.div.style.left = Math.round(document.body.offsetWidth/2-this.div.offsetWidth/2)+"px";
        this.div.style.top = (document.body.offsetHeight-500-anchor_index*22)+"px";
      }
    }
  }

  //smooth display value
  this.disp_value += (this.value - this.disp_value)*0.2;

  //update inner bar
  this.div_inner.style.width = Math.round(this.div.offsetWidth*this.disp_value/100.0)+"px";
}

ProgressBar.prototype.addDom = function()
{
  document.body.appendChild(this.div);

  //add to anchor
  var anchor = anchors[this.data.anchor];
  if(anchor)
    anchor.push(this);
}

ProgressBar.prototype.removeDom = function()
{
  document.body.removeChild(this.div);

  //remove from anchors
  var anchor = anchors[this.data.anchor];
  if(anchor){
    var i = anchor.indexOf(this);
    if(i >= 0)
      anchor.splice(i,1);
  }
}
