<div class="cms-content fill-height flexbox-area-grow cms-tabset center $BaseCSSClasses" data-layout-type="border" data-pjax-fragment="Content" id="ModelAdmin">

	<div class="cms-content-header north">
		<div class="cms-content-header-info vertical-align-items flexbox-area-grow">
			<div class="breadcrumbs-wrapper">
				<span class="cms-panel-link crumb last">
					<% if $SectionTitle %>
						$SectionTitle
					<% else %>
						<%t SilverStripe\Admin\ModelAdmin.Title 'Data Models' %>
					<% end_if %>
				</span>
			</div>
		</div>
	</div>

	<div class="cms-content-fields center ui-widget-content cms-panel-padded fill-height flexbox-area-grow" data-layout-type="border">
		<div class="cms-content-view">
            <h2>A form with a React component</h2>
            $Form

            <h2>A React Widget</h2>
            $Widget

		</div>
	</div>

</div>
