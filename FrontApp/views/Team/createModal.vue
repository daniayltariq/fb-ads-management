<template>
	<div>
     <div class="modal modal-scrollable" :class="{show:modalActive,'d-block':modalActive}" v-if="modalActive" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered " role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Add User</h5>
                    
                </div>
                 <loading :active.sync="isLoading" 
                :can-cancel="false" 
           
                :is-full-page="false"></loading>
                <div class="modal-body">

                    <form action="" @submit.prevent="">
                        <!-- <h6>Choose a Campaign Objective</h6> -->
                        
                        <!-- <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">

                                    <label>Awareness</label>
                                        <div class="kt-radio-list">
                                            <label class="kt-radio">
                                                <input type="radio" value="BRAND_AWARENESS" name="objective" v-model="form.objective"> Brand Awareness
                                                <span></span>
                                            </label>
                                            <label class="kt-radio">
                                                <input type="radio" value="REACH" name="objective" v-model="form.objective"> Reach
                                                <span></span>
                                            </label>
                                            
                                        </div>                            
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Consideration</label>
                                        <div class="kt-radio-list">
                                            <label class="kt-radio">
                                                <input type="radio" value="LINK_CLICKS" name="objective" v-model="form.objective"> Traffic
                                                <span></span>
                                            </label>
                                            <label class="kt-radio">
                                                <input type="radio" value="POST_ENGAGEMENT" name="objective" v-model="form.objective"> Engagement
                                                <span></span>
                                            </label>
                                            <label class="kt-radio">
                                                <input type="radio" value="APP_INSTALLS" name="objective" v-model="form.objective"> App installs
                                                <span></span>
                                            </label>

                                            <label class="kt-radio">
                                                <input type="radio" value="VIDEO_VIEWS" name="objective" v-model="form.objective"> Video views
                                                <span></span>
                                            </label>

                                            <label class="kt-radio">
                                                <input type="radio" value="LEAD_GENERATION" name="objective" v-model="form.objective"> Lead Generation
                                                <span></span>
                                            </label>

                                            <label class="kt-radio">
                                                <input type="radio" value="MESSAGES" name="objective" v-model="form.objective"> Messages
                                                <span></span>
                                            </label>
                                            
                                        </div>                            
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Conversion</label>
                                        <div class="kt-radio-list">
                                            <label class="kt-radio">
                                                <input type="radio" value="CONVERSIONS" name="objective" v-model="form.objective"> Conversions
                                                <span></span>
                                            </label>
                                            <label class="kt-radio">
                                                <input type="radio" value="PRODUCT_CATALOG_SALES" name="objective" v-model="form.objective"> Catalog Sales
                                                <span></span>
                                            </label>

                                            <label class="kt-radio">
                                                <input type="radio" value="STORE_VISITS" name="objective" v-model="form.objective"> Store Traffic
                                                <span></span>
                                            </label>
                                            
                                        </div>                            
                                </div>
                            </div>
                        </div> -->
                        <!-- <hr> -->
                        <div class="row">
                            <div class="col-md-6">

                                <div class="form-group ">
                                    <label> Name</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" v-model="form.name" placeholder="Name">
                                    </div>
                                    <span class="text-danger" v-if="errors.name">{{ errors.name }}</span>
                                </div>

                                <div class="form-group ">
                                    <label> Email</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" v-model="form.email" placeholder="Email">
                                    </div>
                                    <span class="text-danger" v-if="errors.email">{{ errors.email }}</span>
                                </div>


                                <div class="form-group ">
                                    <label> Permissions</label>
                                    <div class="form-check" v-for="(p,i) in permissions">
                                      <input class="form-check-input" v-model="form.permissions" :id="'permissionsCheck'+i" type="checkbox" :value="p.name">
                                      <label class="form-check-label" :for="'permissionsCheck'+i">
                                        {{p.title}}
                                      </label>
                                    </div>

                                    <span class="text-danger" v-if="errors.permissions">{{ errors.permissions }}</span>
                                     
                                </div>

                                <div class="form-group ">
                                    <label>Status</label>
                                    <div class="input-group">
                                 
                                        <select v-model="form.status" class="form-control">
                                            <option value="1" selected>Active</option>
                                            <option value="0">Deactivate</option>
 
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

                    <button @click="closeModal" type="button" class="btn btn-secondary">Cancel</button>
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
        name:"CreateModal",
        props:{
            active:{
                type:Boolean,
                default:false,
            },
            adaccount : {
                type:String
            },
            userid : {
               
            },
            acid : {
                type:String
            },
           
        },
		
		data(){
			return {
                permissions:[],
                modalActive:false,
                isLoading:false,
                errors:{},
                msg:"",
                type:"",

				form : this.newForm()
			}
		},
        computed:{
           ...mapState(['currency'])
        },
		methods:{
            newForm(){
                return {
                   
                    id : "",
                    name : "",
                    email : "",
                    permissions : [],
                    status : "1",
                    
                };
            },
            closeModal(res = null){
                 this.errors = {};
                this.modalActive = false;
                var res = {
                    'active' : this.modalActive,
                    'res' :res,
                }
                this.$emit('close',res);
            },

            getPermissions(){
                axios.get('/api/user_permissions')
                      .then((response) => {
                   
                    this.permissions = response.data;
                     
                  })
                  .catch(function (error) {
                   
                  }).finally( () => {
                    this.isLoading = false;
                  });
            },
	 
            post(){
                this.errors = {};
                this.isLoading = true;
                var params = [
                 `acid=${this.acid}`,
                 `adaccount=${this.adaccount}`,
              ].join('&');

              var user_id = '';
              if(this.userid){
                user_id = '/'+this.userid;
               }

                axios.post('/api/team/manage'+user_id+'?'+params,this.form)
                      .then((response) => {
                    
                    if(response.data.success == false){
                        this.errors = response.data.data;
                    }else if(response.data.success == true){
                        this.notifySuccess(response.data.message);
                        this.form = this.newForm();
                        this.closeModal('reload');
                    }
                      
                  })
                  .catch( (error) => {

                      
                    
                  }).finally( () => {
                    this.isLoading = false;
                  });

            },

            getUser(user_id){

                axios.get('/api/team/'+user_id)
                      .then((response) => {
                       if(response.data){
                            this.form.id = response.data.id;
                            this.form.name = response.data.name;
                            this.form.email = response.data.email;
                            this.form.status = response.data.status;

                            this.form.permissions = response.data.permissions_all;
                       }
                        
                      })
                      .catch(function (error) {
                       
                      }).finally( () => {
                        
                      });

            }

		},
		created(){
            this.getPermissions();
 
		},

        watch:{
            active:function(val){
                this.modalActive = val;
                this.msg = '';
                this.type = '';
            },

            userid:function(val){
                if(val){
                     this.getUser(this.userid);
                }
               
            },
 
        }
	}

</script>