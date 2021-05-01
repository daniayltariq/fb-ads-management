<template>
	<div>
     <div class="modal modal-scrollable" :class="{show:modalActive,'d-block':modalActive}" v-if="modalActive" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered " role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Add Pricing</h5>
                    
                </div>
                 <loading :active.sync="isLoading" 
                :can-cancel="false" 
           
                :is-full-page="false"></loading>
                <div class="modal-body">

                    <form action="" @submit.prevent="">
 
                        <div class="row">
                            <div class="col-md-6">

                                <div class="form-group ">
                                    <label>Name</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" v-model="form.name" placeholder="Name">
                                    </div>
                                </div>

                                 <div class="input-group-prepend">
                                    <label>Type</label>
                                     <select class="form-control" v-model="form.campaign_budget">
                                        <option value="trial">Trial</option>
                                        <option value="paid">Paid</option>
                                    </select>
                                </div>

                                <div class="form-group ">
                                    <label>Status</label>
                                    <div class="input-group">
                                 
                                        <select v-model="form.status" class="form-control">
                                            <option value="PAUSED" selected="">Paused</option>
                                            <option value="ACTIVE">Active</option>
                                        </select>

                                    </div>
                                </div>

                            </div>
                           
                        </div>
   
   
                    </form>
                </div>
                <div class="modal-footer d-block">

                    <div v-if="msg" class="alert fade show" :class="{'alert-danger' : (type == 'danger')}" role="alert">
                         
                        <div class="alert-text">{{ msg }}</div>
                        <div class="alert-close">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true"><i class="la la-close"></i></span>
                            </button>
                        </div>
                    </div>

                    <button @click="closeModal" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button @click="post" type="button" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>

     <div class="modal-backdrop" :class="{show:modalActive}" v-if="modalActive" ></div>   
    </div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
        name:"Modal",
        props:{
            active:{
                type:Boolean,
                default:false,
            },
            
        },
		
		data(){
			return {
                modalActive:false,
                isLoading:false,

                msg:"",
                type:"",

				form : this.newForm()
			}
		},
        computed:{
            
        },
		methods:{
            newForm(){
                return {
                    objective : "",
                    special_ad_categories : "NONE",
                    name : "",
                    status : "PAUSED",
                    daily_budget : "",
                    bid_strategy : "",

                    campaign_budget_optimization:'',
                    campaign_budget:'daily_budget',
                };
            },
            closeModal(res = null){
                this.modalActive = false;
                var res = {
                    'active' : this.modalActive,
                    'res' :res,
                }
                this.$emit('close',res);
            },
	 
            post(){
                this.msg = "";
                this.isLoading = true;
                var params = [
                 `acid=${this.acid}`,
                 `adaccount=${this.adaccount}`,
              ].join('&');

                axios.post('/api/ad_compaigns?'+params,this.form)
                      .then((response) => {
                       
                        if(response.data.error){
                            this.type = 'danger';
                            this.msg = response.data.error.error_user_msg;
                            // this.notifyFailed(response.data.error.error_user_msg);
                        }

                        if(response.data.id){
                            this.notifySuccess('Campaign Added.');
                            this.form = this.newForm();
                            this.closeModal('reload');
                        }
                         // this.accounts = response.data.data;
                         // this.isLoading = false;
                      })
                      .catch(function (error) {
                       
                      }).finally( () => {
                        this.isLoading = false;
                      });;

            }

		},
		created(){
            
		},

        watch:{
            active:function(val){
                this.modalActive = val;
                this.msg = '';
                this.type = '';
            },
 
        }
	}

</script>