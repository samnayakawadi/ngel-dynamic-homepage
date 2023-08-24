import React, { useState, useEffect, useMemo } from 'react';

function ViewPdf ({pdfUrl}) {
    // console.log("pdfUrl --------" , pdfUrl);
    return(<div>
        {/* pdfUrl---- {pdfUrl} */}
        <iframe width="100%" height="800" src={pdfUrl+ "#toolbar=0"} type="application/pdf" embedded="true"></iframe>
    </div> )

}
export default ViewPdf