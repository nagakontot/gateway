    ///////////////////////////////////////////////////////////////////////////
    var vid1         = document.getElementById("headvid1");
    var vid2         = document.getElementById("headvid2");
    var vid3         = document.getElementById("headvid3");
    var vid4         = document.getElementById("headvid4");

    vid1.addEventListener("mouseover",  function(){ if(vid1.paused)vid1.play();else vid1.pause();});
    vid1.addEventListener("mouseout",   function(){ if(vid1.paused)vid1.play();else vid1.pause();});
    
    vid2.addEventListener("mouseover",  function(){ if(vid2.paused)vid2.play();else vid2.pause();});
    vid2.addEventListener("mouseout",   function(){ if(vid2.paused)vid2.play();else vid2.pause();});

    vid3.addEventListener("mouseover",  function(){ if(vid3.paused)vid3.play();else vid3.pause();});
    vid3.addEventListener("mouseout",   function(){ if(vid3.paused)vid3.play();else vid3.pause();});

    vid4.addEventListener("mouseover",  function(){ if(vid4.paused)vid4.play();else vid4.pause();});
    vid4.addEventListener("mouseout",   function(){ if(vid4.paused)vid4.play();else vid4.pause();});

    ///////////////////////////////////////////////////////////////////
    var vid         = document.getElementById("bgvid");
    var pauseButton = document.querySelector("#polina button");

    function vidFade() 
    {   vid.classList.add("stopfade");
    }

    vid.addEventListener('ended', function()
    {   vid.pause();     // only functional if "loop" is removed 
        vidFade();       // to capture IE10
    }); 

    pauseButton.addEventListener("click", function() 
    {   vid.classList.toggle("stopfade");
        if (vid.paused) 
        {  vid.play();
           pauseButton.innerHTML = "Pause";
        } 
        else 
        {  vid.pause();
           pauseButton.innerHTML = "Paused";
        }
    })
    
