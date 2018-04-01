{{#each this}}
	<li>
		<a class="item-link item-content" data-cust-code="{{custCode}}" data-cust-name="{{custName}}">
			<div class="item-inner">
				<div class="item-title-row">
					<div class="item-title">{{custName}}</div>
					<!--<div class="item-after"></div>-->
				</div>
				<div class="item-subtitle">
					{{custAddr}}
				</div>
				<div class="item-text">
					<!--<div>
						<div class="chip {{js "this.ifMatch == 'T' ? 'chip-blue' : 'chip-red'"}}">
    						<div class="chip-label">{{js "this.ifMatch == 'T' ? '已匹配' : '未匹配'"}}</div>
						</div>
					</div>-->
					<div>集团编码：{{custCode}}</div>
					<div>价值等级：{{custValue}}</div>
					<div>集团行业：{{js "this.custIndustryWidth ? this.custIndustryWidth.industryName : ''"}}</div>
					<div>
						集团归属：
						{{js "this.custBelongWidth && this.custBelongWidth.orgLevel == 1 ? this.custBelongWidth.lvl1OrgName: ''"}}
						{{js "this.custBelongWidth && this.custBelongWidth.orgLevel >= 2 ? this.custBelongWidth.lvl2OrgName: ''"}}
						{{js "this.custBelongWidth && this.custBelongWidth.orgLevel >= 3 ? '- '+this.custBelongWidth.lvl3OrgName: ''"}}
					</div>
				</div>
			</div>
		</a>
	</li>
{{/each}}