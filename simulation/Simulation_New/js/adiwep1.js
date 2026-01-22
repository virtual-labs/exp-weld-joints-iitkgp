
$(document).ready(function(){
    $('#cnv').hide();
    $('#adism').hide();
});

$("#wldbtn").click(function(){
  let adiw='adi'+$('#swj .nav-link.active').attr("id")+$('#sgt .nav-link.active').attr("id")+$('#sor .nav-link.active').attr("id");
    $('#cnv').show();
    if(adiw.length==9){
        $("#adicnv").html("<canvas id=\"wes\" style=\"width:100%; height:25%\" class=\"border border-5 border-primary rounded rounded-5\"> <script id=\"adiweld\"></script>");    
            var scrt = document.createElement('script');
            scrt.type = 'module';
            scrt.src = ('./js/'+adiw+'.js');
            var adit = document.getElementById('adiweld');
            adit.parentNode.insertBefore(scrt, adit);
            
            $('#wldbtn').addClass('disabled');
    }else{
        alert("Please select the Weld Joint or Groove Type or Orientation properly.");
    }
});

//$('#adin .nav-link.active').text().slice(0,2)+ $('#adin .nav-link.active').attr("id")