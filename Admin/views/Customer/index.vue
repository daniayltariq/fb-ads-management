<template>

<div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">
 
    <div class="kt-container ">

        <div class="kt-portlet kt-portlet--tabs kt-portlet--height-fluid">
        	<div class="kt-portlet__head">
        		<div class="kt-portlet__head-label">
        			<h3 class="kt-portlet__head-title">
        				Customers
        			</h3>
        		</div>
        		 <div class="kt-portlet__head-toolbar">
                 <div class="d-flex align-items-center">

                
                     
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
                            <th>No. of Facebook Accounts</th>
                            <th>Subscription Status</th>
                            <th>Package Name</th>
                            <th>Trial Ends At</th>
                            <th>Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                      
                        <tr  v-for="(ac,i) in customers.data" key="id" >
                           <td>{{ ac.name }}</td>
                           <td>{{ ac.email }}</td>
                           <td>{{ ac.objective }}</td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td>
                              <!-- <span class="kt-switch--sm kt-switch">
                              <label>
                              <input @change="updateStatus(ac.status,ac)" type="checkbox" :checked="getStatus(ac.status)" value="1">
                              <span></span>
                              </label>
                              </span> -->
                              
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
 
	export default{
 
    props:{
      currency:{
                type:String,
                 
            },
    },
		name:"AdCampaigns",
		data(){
			return {

                campaign_modal:false,
				        customers:{
                  data:[]
                },
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
            campaignModalClose(val){
                this.campaign_modal = val.status;
                if(val.res == 'reload'){
                    this.fetch(this.channel,this.acid,this.adaccount);
                }
            },

            updateStatus(status,ac){

                  var params = [
                   `channel=${this.channel}`,
                   `acid=${this.acid}`,
                   `adaccount=${this.adaccount}`,
                  ];

                  if(status == 'PAUSED'){
                    status = 'ACTIVE';
                  }else{
                    status = 'PAUSED';
                  }

                  params = params.join('&');
                  axios.post('/api/ad_compaigns/status?'+params,{
                    campaign_id : ac.id,
                    status : status,
                  })
                    .then((response) => {
                       
                    })
                    .catch(function (error) {
                     
                    }).finally( () => {
                      this.isLoading = false;
                    });

              },
           

			fetch(){
                
        this.isLoading = true;
 
			  axios.get('/api/admin/customers')
					  .then((response) => {
					     this.isLoading = false;
               this.customers = response.data;
					  })
					  .catch(function (error) {
					   
					  }).finally( () => {
                this.isLoading = false;
              });

			}
		},
		created(){

       this.fetch();
             
		}
	}

</script>