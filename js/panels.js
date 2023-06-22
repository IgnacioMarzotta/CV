jQuery(function($) {

	var startAnimation = function($panelContainer) {
		$panelContainer.addClass('animating');

	};

	var updatePanelNav = function($panelNav, $panelContainer, $panelToSlideIn, numPanels) {

		var idx = $panelToSlideIn.index('#' + $panelContainer.attr('id') + ' > .panel');

		if (idx === 0) {
			$panelNav.find('a[href="#prev"]').addClass('inactive');
		} else {
			$panelNav.find('a[href="#prev"]').removeClass('inactive');
		}

		if (idx == numPanels-1) {
			$panelNav.find('a[href="#next"]').addClass('inactive');
		} else {
			$panelNav.find('a[href="#next"]').removeClass('inactive');
		}

	};

	var stopAnimation = function($panelContainer, $panels, $panelToSlideIn) {
		var extraClass = $panelContainer.data('extraclass') || '';
		$panelToSlideIn.removeClass().addClass('panel current ' + extraClass);
		$panels.filter(':not(#' + $panelToSlideIn.attr('id')	+ ')').removeClass().addClass('panel ' + extraClass);
		$panelContainer.removeClass('animating');
	};

	var setExitPanel = function($panelToSlideOut, exitAnimation) {
		$panelToSlideOut.addClass('exit ' + exitAnimation).removeClass('current');
	};

	var setEnterPanel = function($panelContainer, $panels, $panelToSlideIn, enterAnimation) {
		$panelToSlideIn.addClass('enter ' + enterAnimation)			;
	};

	$('.panelNav').each(function(i) {

		var $panelNav = $(this),
			$panelNavItems = $panelNav.find('a'),
			$panelContainer = $('#' + $panelNav.data('panelwrapper')),
			$panels = $panelContainer.find('> .panel'),
			numPanels = $panels.length,
			animationDuration = ($panelContainer.data('sequential') == 'yes') ? 600 : 300;


		if (numPanels > 1) {
			$panelNav.find('a[href="#next"]').removeClass('inactive');
		}

		$panelNavItems.on('click', function(e) {

			e.preventDefault();

			var $panelToSlideIn, $panelToSlideOut, enterAnimation, exitAnimation;

			if ($panelContainer.is('.animating')) return false;

			$panelToSlideOut = $panels.filter('.current');

			if ($(this).attr('href') == '#next') {
				$panelToSlideIn = $panels.filter('.current').next('.panel');
			} else if ($(this).attr('href') == '#prev') {
				$panelToSlideIn = $panels.filter('.current').prev('.panel');
			} else {
				$panelToSlideIn = /* $panels.filter('#' + */ $($(this).attr('href')) /* .attr('id')) */;
			}

			if ($panelToSlideOut.attr('id') == $panelToSlideIn.attr('id')) return;

			enterAnimation = $panelToSlideIn.data('enter') || $panelContainer.data('enter');
			exitAnimation = $panelToSlideOut.data('exit') || $panelContainer.data('exit');

			setExitPanel($panelToSlideOut, exitAnimation);
			setEnterPanel($panelContainer, $panels, $panelToSlideIn, enterAnimation);

			setTimeout(function() {
				startAnimation($panelContainer);
			}, 0);

			updatePanelNav($panelNav, $panelContainer, $panelToSlideIn, numPanels);

			setTimeout(function() {
				stopAnimation($panelContainer, $panels, $panelToSlideIn);
			}, animationDuration);

		});


	});
});


var btnContainer = document.getElementById("main_header_menu");
var btns = btnContainer.getElementsByTagName("a");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    (document.querySelector('.menuActive')) ? document.querySelector('.menuActive').classList.remove('menuActive') : '';
    this.classList.add('menuActive');
  });
} 