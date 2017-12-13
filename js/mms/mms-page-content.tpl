{{#each this}}
	<div class="card">
		<div class="card-header">
			{{title}}
		</div>
		<div class="card-content">
			<div class="card-content-inner">
				<div class="row aui-ranking-owner">
					<div class="col-70">
						<div class="aui-ranking-badge owner">
							<div class="aui-ranking-header">{{owner.rank}}</div>
							<div class="aui-ranking-footer"></div>
						</div>
						{{owner.name}}(我的排行)
					</div>
					<div class="col-30">{{owner.value}}</div>
				</div>
				<div class="row">
					<div class="col-50">
						<div class="row">
							{{#each this.ranks}}
								{{#js_if "this.rank < 5"}}
									<div class="col-70">
										<div class="aui-ranking-badge {{js "this.rank < 5 ? 'asc' : 'desc'"}}">
											<div class="aui-ranking-header">{{rank}}</div>
											<div class="aui-ranking-footer"></div>
										</div>
										{{name}}
									</div>
									<div class="col-30">{{value}}</div>
								{{/js_if}}
							{{/each}}
						</div>
					</div>
					<div class="col-50">
						<div class="row">
							{{#each this.ranks}}
								{{#js_if "this.rank > 5"}}
									<div class="col-70">
										<div class="aui-ranking-badge {{js "this.rank < 5 ? 'asc' : 'desc'"}}">
											<div class="aui-ranking-header">{{rank}}</div>
											<div class="aui-ranking-footer"></div>
										</div>
										{{name}}
									</div>
									<div class="col-30">{{value}}</div>
								{{/js_if}}
							{{/each}}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="card-footer">
			<a>查看详情</a>
		</div>
	</div>
{{/each}}