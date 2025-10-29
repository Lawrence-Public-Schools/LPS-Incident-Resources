/* Ensure $j is available across PS versions */
if (typeof $j === 'undefined' && typeof jQuery !== 'undefined') {
  var $j = jQuery;
}

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
    $target.prepend( $j("#incidentCodes") );
    $target.prepend( $lpsHeaders.eq(2) );
    $target.prepend( $j("#letterTemplates") );
    $target.prepend( $lpsHeaders.eq(1) );
    $target.prepend( $j("#incidentResources") );
    $target.prepend( $lpsHeaders.first() );
    
    $j("div#LPS-DRCustomhiddentable").remove();
    ModLPSDispResources();
}

function AddLPSDispResources() {
  // Avoid duplicate insertion
  if ($j('#LPS-DRCustom').length > 0 || $j('#incidentResources').length > 0) {
    return;
  }

  function getMainContainer() {
    // Prefer the long-standing PS container, then fallbacks for newer skins
    let $c = $j('div#content-main');
    if ($c.length) return $c;
    $c = $j('div#content');
    if ($c.length) return $c;
    $c = $j('main#content');
    if ($c.length) return $c;
    return $j('body');
  }

  var $incidentBox = null;

  // 1) Detailed incident (older/newer variants)
  if ($j('#incidentBody').length > 0 || $j('#incidentDetail').length > 0) {
    // Insert near the top of the primary form/panel if present, else fall back to content container
    let $panel = $j('#myForm, form#incidentForm').first();
    if ($panel.length) {
      // Create a container at the top of the panel
      $panel.prepend('<div id="LPS-DRCustom"></div>');
      $incidentBox = $j('#LPS-DRCustom');
    }
  }

  // 2) Incident landing/list/summary pages
  if (!$incidentBox) {
    // Match a variety of headings used across versions
    const headings = [
      "Incident Management",
      "Incident List",
      "Incidents Summary",
      "All Incidents",
      "Incidents"
    ];
    let $content = getMainContainer();
    // Always create a dedicated container at the very top of the main content
    if ($content.length) {
      if ($content.children().length > 0) {
        $content.children().first().before('<div id="LPS-DRCustom"></div>');
      } else {
        $content.prepend('<div id="LPS-DRCustom"></div>');
      }
      $incidentBox = $j('#LPS-DRCustom');
    }

    // Additionally, if a known heading is present but we didn’t find a container, attempt to place after it
    if (!$incidentBox || !$incidentBox.length) {
      for (let i = 0; i < headings.length; i++) {
        let h = headings[i];
        let $h1 = $j("h1:contains('" + h + "')").first();
        if ($h1.length) {
          $h1.after('<div id="LPS-DRCustom"></div>');
          $incidentBox = $j('#LPS-DRCustom');
          break;
        }
      }
    }
  }

  if ($incidentBox && $incidentBox.length) {
    prepResources($incidentBox);
  } else {
    // If we cannot determine a safe target, unhide the content inline so users still see it
    $j('#LPS-DRCustomhiddentable').show();
  }
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
