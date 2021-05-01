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
                        
                        <div class="kt-section kt-section--first">
                            <div class="kt-section__body">
                                <h3 class="kt-section__title kt-section__title-lg">Password Update</h3>
                              
                                <div class="form-group">
                                    <label>Current Password</label>
                                    <input v-model="form.current_password" type="password" class="form-control" placeholder="Current Password">
                                    <span class="text-danger mt-1" v-if="errors.current_password">{{ errors.current_password }}</span>
                                </div>

                                <div class="form-group">
                                    <label>New Password</label>
                                    <input v-model="form.new_password" type="password" class="form-control" placeholder="New Password">
                                    <span class="text-danger mt-1" v-if="errors.new_password">{{ errors.new_password }}</span>
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
                    <button @click="post" type="button" class="btn btn-primary">Update</button>
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
        name:"PassChangeModal",

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
           
        },
        methods:{
            newForm(){
                return {
                   
                    current_password : "",
                    new_password : "",
 
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
 
            post(){
                this.errors = {};
                this.isLoading = true;
               
         
                axios.post('/api/password/update',this.form)
                      .then((response) => {
                    
                    if(response.data.success == false){

                        this.errors = response.data.data;

                    }else if(response.data.success == true){

                        this.notifySuccess(response.data.message);
                        this.form = this.newForm();

                        window.location.reload();
                    }
                      
                  })
                  .catch( (error) => {
 
                    
                  }).finally( () => {
                    this.isLoading = false;
                  });

            },
 
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