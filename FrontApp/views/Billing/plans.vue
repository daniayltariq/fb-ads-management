<template>

	<div v-if="isMainAccount()" class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">


		<div class="modal fade" id="checkoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		    <div class="modal-dialog modal-dialog-centered" role="document">
		        <div class="modal-content">
		             
		            <div class="modal-body">
		                	<div class="modal-header p-4">
				                <h5 class="modal-title">{{ selected_plan.name }}</h5>
				         
				            </div>
							<div class="card-body p-4">

							<div class="tab-content">
								<div class="tab-pane fade active show" id="nav-tab-card">
									 
									<form role="form">
									<div class="form-group">
										<label for="username">Full name (on the card)</label>
										<input type="text" class="form-control" name="username" placeholder="" required="">
									</div> <!-- form-group.// -->

									<div class="form-group">
										<label for="cardNumber">Card number</label>
										<div class="input-group">
											<input type="text" class="form-control" name="cardNumber" placeholder="">
											<div class="input-group-append">
												<span class="input-group-text text-muted">
													<i class="fab fa-cc-visa"></i> &nbsp; <i class="fab fa-cc-amex"></i> &nbsp; 
													<i class="fab fa-cc-mastercard"></i> 
												</span>
											</div>
										</div>
									</div> <!-- form-group.// -->

									<div class="row">
									    <div class="col-sm-8">
									        <div class="form-group">
									            <label><span class="hidden-xs">Expiration</span> </label>
									        	<div class="input-group">
									        		<input type="number" class="form-control" placeholder="MM" name="">
										            <input type="number" class="form-control" placeholder="YY" name="">
									        	</div>
									        </div>
									    </div>
									    <div class="col-sm-4">
									        <div class="form-group">
									            <label data-toggle="tooltip" title="" data-original-title="3 digits code on back side of the card">CVV <i class="fa fa-question-circle"></i></label>
									            <input type="number" class="form-control" required="">
									        </div> <!-- form-group.// -->
									    </div>
									</div>



									<div class="d-flex justify-content-between mb-2">
				                        <h3><strong>TOTAL</strong></h3>
				                        <h3><strong>${{selected_plan.pricing}}</strong></h3>
				                    </div>

				                    <div class="custom-control custom-checkbox mb-3">
						              <input type="checkbox" class="custom-control-input" id="same-address">
						              <label class="custom-control-label" for="same-address">I agree with <a href="https://adbotics.io/tc/" target="_blank">Terms & Conditions</a></label>
						            </div>

									<button class="subscribe btn btn-primary btn-block" type="button"> Confirm </button>
									</form>
								</div>
							
							
							</div>

						</div>
							 
		            </div>
		            
		        </div>
		    </div>
		</div>
 
		<div class="kt-portlet">
			<div class="kt-portlet__body kt-portlet__body--fit">
				<div class="kt-pricing-2 mb-5 pb-5">
					<div class="kt-pricing-2__head">
						<div class="kt-pricing-2__title ">
							<h1>Change your current plan</h1>
						</div>

						<div class="row my-5 d-flex justify-content-center">
							<div class="col-md-4">
								<div class="progress" style="height:20px;font-size: 15px;">
								  <div class="progress-bar progress-bar-info" role="progressbar" :aria-valuenow="percentage(currentSpend.adspent,currentSpend.adspent_limit)"
								  aria-valuemin="0" aria-valuemax="100" :style="'width:'+percentage(currentSpend.adspent,currentSpend.adspent_limit)+'%'">
								  
								  </div>
 
								</div>

								<div class="d-flex justify-content-between" style="font-size: 14px;margin-top:5px">
								  	<span>
								  		 Current Spend {{ currentSpend.adspent  }}$ 
								  	</span>
								  	<span>
								  		Limit {{currentSpend.adspent_limit}}$
								  	</span>
								  </div>
							</div>
						</div>

						<div class="btn-groupup nav btn-group btn-group-pill btn-group-air mt-0" role="group">
							<button  type="button" class="btn  active btn-wide btn-uppercase btn-bolder" data-toggle="tab" href="#kt-pricing-2_content1" role="tab" aria-expanded="true">
								Monthly Plans 
							</button>                 
							<button type="button" class="btn  btn-wide btn-uppercase btn-bolder" data-toggle="tab" href="#kt-pricing-2_content2" role="tab" aria-expanded="false">
								Annually Plans
							</button>
						</div>
					</div>
					<div class="tab-content">
						<div class="tab-pane active" id="kt-pricing-2_content1" aria-expanded="true">
							<div class="kt-pricing-2__content">
								<div class="kt-pricing-2__container">
									<div class="kt-pricing-2__items row">
										<div v-for="(p,i) in plans.monthly" class="kt-pricing-2__item col-lg-4">
											<div class="plans-border">
												 
												<h2 class="kt-pricing-2__subtitle">{{ p.name }}</h2>
												
												<span class="kt-pricing-2__price">{{ p.pricing }}</span> 
												<span class="kt-pricing-2__label">$</span>
												<hr>
												<div class="kt-pricing-2__features" v-html="p.benefits">
													 
												</div>
												<div class="kt-pricing-2__btn">
													<span class="btn btn-success btn-wide btn-uppercase btn-bolder btn-lg" v-if="subscritpion && (subscritpion.pricing_id == p.id)">
														Current
													</span>
													<a v-else-if="p.pricing_type == 'trial'" href="" class="btn btn-primary btn-wide btn-uppercase btn-bolder btn-lg">Continue</a>
													<button v-else type="button" class="btn btn-primary btn-wide btn-uppercase btn-bolder btn-lg" @click="checkoutModal(p)">Purchase</button>
												</div>
											</div>
										</div>
										
									</div>
								</div>
							</div>
						</div>
						<div class="tab-pane" id="kt-pricing-2_content2" aria-expanded="false">
							<div class="kt-pricing-2__content">
								<div class="kt-pricing-2__container">
									<div class="kt-pricing-2__items row">

										<div v-for="(p,i) in plans.yearly" class="kt-pricing-2__item col-lg-4">
											<div class="plans-border">
												 
												<h2 class="kt-pricing-2__subtitle">{{ p.name }}</h2>
												
												<span class="kt-pricing-2__price">{{ p.pricing }}</span> 
												<span class="kt-pricing-2__label">$</span>
												<hr>
												<div class="kt-pricing-2__features" v-html="p.benefits">
													 
												</div>
												<div class="kt-pricing-2__btn">
													
													<span class="btn btn-success btn-wide btn-uppercase btn-bolder btn-lg" v-if="subscritpion && (subscritpion.pricing_id == p.id)">
														Current
													</span>

													<a v-else-if="p.pricing_type == 'trial'" href="" class="btn btn-primary btn-wide btn-uppercase btn-bolder btn-lg">Continue</a>

													<button v-else type="button" class="btn btn-primary btn-wide btn-uppercase btn-bolder btn-lg" @click="checkoutModal(p)">Purchase</button>

												</div>
											</div>
										</div>
 
										 
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	 </div>
	
</template>


<script>
	
	export default{
		name:"plans",
		
		data(){
			return {
				currentSpend:{},
				subscritpion:{},
				plans:{
					yearly:[],
					monthly:[],
				},
				selected_plan:{
					name:''
				},
			}
		},

		methods:{

			percentage(start,end){

				var a = start/end;
				a = a*100;

				return parseInt(a);

			},

			fetch(){
				axios.get('/api/pricing')
                      .then((response) => {
                        
                      	this.plans.monthly = response.data.data.monthly;
                      	this.plans.yearly = response.data.data.yearly;
                         
                      })
                      .catch(function (error) {
                       
                      }).finally( () => {
                        this.isLoading = false;
                      });
			},
			checkoutModal(plan){
				this.selected_plan = plan;
				$('#checkoutModal').modal('show');
			},

			getSpend(){
				this.getCurrentSpend().then((res) => {
					this.currentSpend = res.data;
				});
			}
		},

		created(){
			     this.getSpend();
			    this.subscritpion = window.auth_user_subscription;
				this.fetch();
		}
	}

</script>


<style>
.kt-pricing-2 {
  padding: 0 0 2.86rem 0; }
  .kt-pricing-2 .kt-pricing-2__head {
    text-align: center;
    background-color: #fff;
    padding: 8.57rem 0 25rem 0; }
    .kt-pricing-2 .kt-pricing-2__head .kt-pricing-2__title {
      text-align: center;
      margin-top: -3.57rem; }
    .kt-pricing-2 .kt-pricing-2__head .btn-group {
      text-align: center;
      display: inline-block;
      margin: 2.5rem auto 0 auto; }
      .kt-pricing-2 .kt-pricing-2__head .btn-group .btn {
        margin-right: -0.21rem;
        padding: 1rem 1.93rem 1rem 1.93rem;
        background: #fff;
        color: #74788d; }
        .kt-pricing-2 .kt-pricing-2__head .btn-group .btn.active {
          background: #fe3c3d;
          color: #ffffff; }
  .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container {
    margin: 0 auto;
    max-width: 75%;
    margin-top: -21.64rem; }
    .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items {
      background-color: #fff;
      position: relative;
      text-align: center;
      padding: 2.14rem 0.71rem 2.14rem 0.71rem; }
      .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item {
        
        width: 100%; 
    	
    }

    	.plans-border{
    		border: 1px solid #e2e2e2;
    		    padding: 30px;
    	}
      
        .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item .kt-pricing-2__visual {
          position: relative;
          margin-top: 6.8rem;
          left: 50%;
          -webkit-transform: translateX(-50%) translateY(-50%);
          transform: translateX(-50%) translateY(-50%); }
          .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item .kt-pricing-2__visual .kt-pricing-2__hexagon {
            height: 0;
            background: #F4FCFF;
            left: 50%;
            -webkit-transform: translateX(-50%) translateY(-50%);
            transform: translateX(-50%) translateY(-50%);
            position: absolute; }
            .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item .kt-pricing-2__visual .kt-pricing-2__hexagon:before {
              content: "";
              position: absolute;
              top: -2.14rem;
              width: 13.2rem;
              height: 0;
              border-left: 3.35rem solid transparent;
              border-right: 3.35rem solid transparent;
              border-bottom: 5.71rem solid #F4FCFF;
              left: 50%;
              -webkit-transform: translateX(-50%) translateY(-50%);
              transform: translateX(-50%) translateY(-50%); }
            .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item .kt-pricing-2__visual .kt-pricing-2__hexagon:after {
              content: "";
              position: absolute;
              top: 3.57rem;
              width: 13.21rem;
              height: 0;
              border-left: 3.35rem solid transparent;
              border-right: 3.35rem solid transparent;
              border-top: 5.71rem solid #F4FCFF;
              left: 50%;
              -webkit-transform: translateX(-50%) translateY(-50%);
              transform: translateX(-50%) translateY(-50%); }
          .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item .kt-pricing-2__visual .kt-pricing-2__icon {
            margin-top: 0.8rem;
            left: 50%;
            -webkit-transform: translateX(-50%) translateY(-50%);
            transform: translateX(-50%) translateY(-50%);
            position: absolute; }
            .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item .kt-pricing-2__visual .kt-pricing-2__icon > i {
              font-size: 6.43rem; }
        .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item .kt-pricing-2__subtitle {
          margin-top: 1.1rem;
          font-size: 1.64rem;
          color: #595d6e; }
        .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item .kt-pricing-2__features {
          margin: 2.14rem 0 1.8rem;
          line-height: 2.2; }
          .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item .kt-pricing-2__features > span {
            display: block;
            color: #74788d;
            font-weight: 500; }
        .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item .kt-pricing-2__price {
          font-size: 3.21rem;
          font-weight: 600;
          color: #595d6e; }
        .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item .kt-pricing-2__label {
          margin: 0.64rem 0 0 0.35rem;
          font-size: 25px;
          position: absolute;
          color: #74788d; }
        .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item .kt-pricing-2__btn {
          margin: 2.14rem auto 2.14rem auto; }
          .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item .kt-pricing-2__btn > .btn {
            padding: 0.86rem 3.6rem 0.86rem 3.6rem;
            font-size: 0.86rem; }

@media (min-width: 1025px) and (max-width: 1399px) {
  .kt-pricing-2 .kt-pricing-2__content {
    padding: 0 2.14rem 0 2.14rem; }
    .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container {
      max-width: 90%; }
      .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item {
        border-right: 1px solid #e1f1ff;
        padding-left: 0.71rem;
        padding-right: 0.71rem; }
        .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item:last-child {
          border-right: none; }
        .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item .kt-pricing-2__btn {
          margin: 1.43rem auto 3.6rem auto; } }

@media (min-width: 769px) and (max-width: 1024px) {
  .kt-pricing-2 .kt-pricing-2__content {
    padding: 0 2.14rem 0 2.14rem; }
    .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container {
      max-width: 90%; }
      .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item {
        border-bottom: 1px solid #e1f1ff;
        border-right: none;
        padding-left: 0.71rem;
        padding-right: 0.71rem;
        margin-bottom: 2rem; }
        .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item:last-child {
          border-bottom: none;
          margin-bottom: 0; }
        .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item .kt-pricing-2__btn {
          margin: 1.43rem auto 3.6rem auto; } }

@media (max-width: 768px) {
  .kt-pricing-2 .kt-pricing-2__head .kt-pricing-2__title {
    top: 4%; }
    .kt-pricing-2 .kt-pricing-2__head .kt-pricing-2__title > h1 {
      font-size: 1.8rem; }
  .kt-pricing-2 .kt-pricing-2__head .btn-group {
    top: 8%; }
    .kt-pricing-2 .kt-pricing-2__head .btn-group .btn {
      padding: 0.71rem 0.71rem 0.71rem 0.71rem; }
  .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container {
    width: 100%; }
    .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item {
      border-bottom: 1px solid #e1f1ff;
      border-right: none;
      padding-left: 0.71rem;
      padding-right: 0.71rem;
      margin-bottom: 2rem; }
      .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item:last-child {
        border-bottom: none;
        margin-bottom: 0; }
      .kt-pricing-2 .kt-pricing-2__content .kt-pricing-2__container .kt-pricing-2__items .kt-pricing-2__item .kt-pricing-2__btn {
        margin: 1.43rem auto 3.6rem auto; } }

  .kt-pricing-2__head .btn{
  	border: 1px solid red;
  }
</style>