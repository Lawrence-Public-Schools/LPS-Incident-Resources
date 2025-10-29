function ModLPSDispResources() {
  /* Inserting code number cells dynamically to keep this file smaller and easier to update */
  let letters = ['C','D','M'];
  let $codeTables = $j("table.LPS-codeTable");
  $codeTables.each(function(indx1, elmnt1) {
    let $codeDescs = $j(elmnt1).find("td.codeDesc");
    let codeLetter = letters[indx1];
    let codeNum_i = 1;
    let codeNum_j = 1;
    $codeDescs.each(function(indx2, elmnt2) {
      let iCode = codeLetter + codeNum_i;
      
      function createSubCode (max) {
        iCode += ("." + codeNum_j);
        if( codeNum_j < max) {
          codeNum_i--;
          codeNum_j++;
        } else { codeNum_j = 1; }
        return;
      }

      switch(iCode) {
        case 'C11':
          createSubCode(4);
          break;
        case 'C12':
          createSubCode(4);
          break;
        case 'C14':
          createSubCode(2);
          break;
        case 'D3':
          createSubCode(3);
          break;
        case 'D8':
          createSubCode(4);
          break;
        case 'D9':
          createSubCode(4);
          break;
        case 'D13':
          createSubCode(2);
          break;
        case 'M3':
          createSubCode(2);
          break;
        case 'M5':
          createSubCode(5);
          break;
        case 'M6':
          createSubCode(3);
          break;
        case 'M9':
          createSubCode(4);
          break;
        case 'M10':
          createSubCode(4);
          break;
        case 'M12':
          createSubCode(2);
          break;
        case 'M13':
          createSubCode(2);
          break;
        default:
          break;
      }
      $j(elmnt2).before("<td>" + iCode + "</td>");
      codeNum_i++;
    });
  });
}

function prepResources($target) {
    let $lpsHeaders = $j('.lpsCollapsibleHeader'); /* [(0)"Incident Resources", (1)"Incident Letter Templates", (2)"Incident Codes"] */
    
    
    /* Build by stacking on top of "Incident Description" */
    $target.prepend( $j("#incidentLPSCodes") );
    $target.prepend( $lpsHeaders.eq(2) );
    $target.prepend( $j("#letterTemplates") );
    $target.prepend( $lpsHeaders.eq(1) );
    $target.prepend( $j("#incidentResources") );
    $target.prepend( $lpsHeaders.first() );
    
    $j("div#LPS-DRCustomhiddentable").remove();
    ModLPSDispResources();
}

function AddLPSDispResources() {
  var $incidentBox;
  
  if ( $j("#incidentBody").length > 0 ) {
    $incidentBox = $j('#myForm > div.box-round');
    prepResources($incidentBox);
    
  } else if ( $j("div#content-main > h1:contains('Incident Management')").length > 0 ) {
    $incidentBox = $j("h1:contains('Incident Management') + div");
    prepResources($incidentBox);
    
  } else if ( $j("div#content-main > h1:contains('Incident List')").length > 0 ) {
    $j("div#content-main > div.box-round.incident-collapsible").before( '<div id="LPS-DRCustom">');
    $incidentBox = $j("div#content-main > div#LPS-DRCustom");
    prepResources($incidentBox);
    
  } else if ( $j("div#content-main > h1:contains('Incidents Summary')").length > 0 ) {
    $incidentBox = $j("div#content-main > form#rptFilters");
    prepResources($incidentBox);
    
  } else { $j("div#LPS-DRCustomhiddentable").remove(); }
}

//debugger;
if (!!LPSDRTEST ) {
  //console.log('LPSDRTEST not is null');
  var LPSDRTEST = 0;
} else {
  //console.log('LPSDRTEST is null');
  var LPSDRTEST = 1;
  $j(document).ready(AddLPSDispResources);
}

//if (LPSDRTEST == 1)
//{
    //$j(document).ready(AddLPSDispResources);
//}