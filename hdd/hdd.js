    function makeHDD(name, size) {
        var hddName = document.getElementById(name);
        var hddSize = document.getElementById(size);
        const fs=require('fs');
        const fileSizeInBytes=hddSize.value*1024*1024*1024;
        var FileName = hddName.value + ".img";
        fs.writeFileSync((FileName),Buffer.alloc(fileSizeInBytes));
      }