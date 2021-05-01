<template>

<div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor pt-0">

    <create-modal :currency="currency" :adaccount="adaccount" :userid="UserEditId" :acid="acid" :active="UserModal" @close="userModalClose"></create-modal>

    <!-- <div class="kt-container "> -->
    <div class="">

        <div class="kt-portlet kt-portlet--tabs kt-portlet--height-fluid">
        	<div class="kt-portlet__head">
        		<div class="kt-portlet__head-label">
        			<h3 class="kt-portlet__head-title">
        				Team Members
        			</h3>
        		</div>
        		 <div class="kt-portlet__head-toolbar">
                 <div class="d-flex align-items-center">
                     
                    <button @click="UserModal = true" class="btn btn-sm btn-label-brand btn-bold">
                        Add User
                    </button>
                 </div>
             </div>
        	</div>
            <div class="kt-portlet__body">
                <loading :active.sync="isLoading" 
                :can-cancel="false" 
           
                :is-full-page="false"></loading>
                <table class="table table-head-bg-brand">
                    <thead class="thead-inverse">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                             
                        </tr>
                    </thead>
                    <tbody>
                      
                        <tr  v-for="(ac,i) in team_members" key="id" >
                           <td>
                          
                          <router-link  tag="span" key="id" :to="{ name: 'automation.adsets', params:{ campaign:ac.id }, query:{channel:channel,acid:acid,adaccount:adaccount}}" >
                               {{ ac.name }}
                          </router-link>
                         </td>
                           <td>{{ ac.email }}</td>
                           
                          
                           <td>
                              <span class="kt-switch--sm kt-switch">
                              <label>
                              <input @change="updateStatus(ac.status,ac)" type="checkbox" :checked="getStatus(ac.status)" value="1">
                              <span></span>
                              </label>
                              </span>
                              
                            </td>

                            <td>
                              <a href="#" class="btn btn-clean btn-sm btn-icon btn-icon-md" data-toggle="dropdown">
                                      <i class="flaticon-more-1"></i>
                                  </a>
                                  <div class="dropdown-menu dropdown-menu-fit dropdown-menu-right">
                                      <ul class="kt-nav">
                                          <li class="kt-nav__item">
                                                <a href="#" @click="UserEditId = ac.id;UserModal = true" class="kt-nav__link">
                                                 <i class="kt-nav__link-icon flaticon2-settings"></i>
                                                  <span class="kt-nav__link-text">Edit</span>
                                              </a>
                                          </li>

                                          <!-- <li class="kt-nav__item">
                                              <a href="#" class="kt-nav__link">
                                                  <i class="kt-nav__link-icon flaticon2-delete"></i>
                                                  <span class="kt-nav__link-text">Remove</span>
                                              </a>
                                          </li> -->

                                      </ul>
                                  </div>
                            </td>
                        </tr>
                          <!--   <td>
                                <router-link :to="{ name: 'automation.adsets', params:{ campaign:ac.id }, query:{channel:channel,acid:acid,adaccount:adaccount}}" tag="a" class="btn btn-sm btn-label-brand btn-bold">
                                    Select
                                </router-link>
                            </td> -->
                      
                        
                    </tbody>
                </table>

                <div class="pagination text-center">
                    <button  :disabled="!before" @click="previous" type="button" class="btn btn-info mr-2">Previous</button>
                    <button  :disabled="!after" @click="next" type="button" class="btn btn-info">Next</button>
                </div>
                
            </div>
            

        </div>

	</div>


             
</div>
</template>

<script>
	import CreateModal from './createModal';
	export default{

        components:{
            CreateModal
        },
    props:{
      currency:{
                type:String,
                 
            },
    },
		name:"TeamIndex",
		data(){
			return {
                UserEditId:'',
                UserModal:false,
				        team_members:[],
                channel:"",
                acid:"",
                adaccount:"",
                isLoading:false,

                // Paging
                after:"",
                before:"",
             
                // Paging
			}
		},
    
		methods:{
            
            campaignCBO(bid_strategy){
              if(bid_strategy){
                return 'Yes';
              }else{
                return '--';
              }
            },

            previous(){
                
                this.fetch(this.channel,this.acid,this.adaccount,this.before,false);
            },
            next(){
                
                this.fetch(this.channel,this.acid,this.adaccount,false,this.after);
               
            },
            userModalClose(val){
                this.UserModal = val.status;
                this.UserEditId = '';
                if(val.res == 'reload'){
                    this.fetch(this.channel,this.acid,this.adaccount);
                }
            },

            updateStatus(status,ac){
 
                  if(status == 0){
                    status = 1;
                  }else{
                    status = 0;
                  }
 
                  axios.post('/api/team/status',{
                    user_id : ac.id,
                    status : status,
                  })
                    .then((response) => {
                       
                    })
                    .catch(function (error) {
                     
                    }).finally( () => {
                      this.isLoading = false;
                    });

              },
           

			fetch(user_id = null){
                
        this.isLoading = true;
           
           if(user_id){
            user_id = '/'+user_id;
           }

			  axios.get('/api/team'+user_id)
					  .then((response) => {

                 this.team_members = response.data.data.data;

					  })
					  .catch(function (error) {
					   
					  }).finally( () => {
                        this.isLoading = false;
                      });

			}
		},
		created(){
            this.fetch(this.channel,this.acid,this.adaccount);
		        
            if(this.currency){
              this.$store.commit("SET_CURRENCY",this.currency);
            }	 
		}
	}

</script>