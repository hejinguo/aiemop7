{{#each this}}
	<li>
		<a href="pages/bigdata/unit-img.html?unitId={{unitId}}" class="item-link item-content">
			<div class="item-media">
				<div class="chip-media bg-light-blue" style="font-size:14px">{{dynamicType}}</div>
			</div>
			<div class="item-inner">
				<div class="item-title-row">
					<div class="item-title">{{unitName}}</div>
					<!--<div class="item-after">$15</div>-->
				</div>
				<!--<div class="item-subtitle">Beatles</div>-->
				<div class="item-text">
					<div>价值等级：{{dynamicType}}</div>
					<div>集团编码：{{unitId}}</div>
				</div>
			</div>
		</a>
	</li>
{{/each}}