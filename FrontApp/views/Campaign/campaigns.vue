<template>

<div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">

    <campaign-create-modal :currency="currency" :adaccount="adaccount" :acid="acid" :active="campaign_modal" @close="campaignModalClose"></campaign-create-modal>

    <div class="kt-container ">

        <div class="kt-portlet kt-portlet--tabs kt-portlet--height-fluid">
        	<div class="kt-portlet__head">
        		<div class="kt-portlet__head-label">
        			<h3 class="kt-portlet__head-title">
        				Ad Compaigns
        			</h3>
        		</div>
        		 <div class="kt-portlet__head-toolbar">
                 <div class="d-flex align-items-center">
                    <router-link :to="{ name: 'automation.rules', query:{channel:channel,acid:acid,adaccount:adaccount}}" class="btn btn-sm btn-label-brand btn-bold mr-2">
                        Rules
                    </router-link>
                     <router-link :to="{ name: 'automation.rule_setting', query:{channel:channel,acid:acid,adaccount:adaccount}}" class="btn btn-sm btn-label-brand btn-bold mr-2">
                        Create Rule
                    </router-link>
                    <button @click="campaign_modal = true" class="btn btn-sm btn-label-brand btn-bold">
                        Create Campaign
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
                            <th>Status</th>
                            <th>Objective</th>
                            <th>CBO</th>
                            <th>Status</th>
                            <!-- <th>Operation</th> -->
                        </tr>
                    </thead>
                    <tbody>
                      
                        <tr  v-for="(ac,i) in accounts" key="id" >
                           <td>
                          
                          <router-link  tag="span" key="id" :to="{ name: 'automation.adsets', params:{ campaign:ac.id }, query:{channel:channel,acid:acid,adaccount:adaccount}}" >
                               {{ ac.name }}
                          </router-link>
                         </td>
                           <td>{{ ac.status }}</td>
                           <td>{{ ac.objective }}</td>
                           <td>

                            {{ campaignCBO(ac.bid_strategy) }}
                             
                           </td>
                           <td>
                              <span class="kt-switch--sm kt-switch">
                              <label>
                              <input @change="updateStatus(ac.status,ac)" type="checkbox" :checked="getStatus(ac.status)" value="1">
                              <span></span>
                              </label>
                              </span>
                              
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
	import CampaignCreateModal from './createModal';
	export default{

        components:{
            CampaignCreateModal
        },
    props:{
      currency:{
                type:String,
                 
            },
    },
		name:"AdCampaigns",
		data(){
			return {

                campaign_modal:false,
				        accounts:[],
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
           

			fetch(channel,acid,adaccount,before = false,after = false){
                
                this.isLoading = true;
                var params = [
                     `channel=${channel}`,
                     `acid=${acid}`,
                     `adaccount=${adaccount}`,
                  ];
                if(before){
                    params.push(`before=${before}`);
                }
                if(after){
                    params.push(`after=${after}`);
                }

              params = params.join('&');

			  axios.get('/api/ad_compaigns?'+params)
					  .then((response) => {
					     this.accounts = response.data.data.data;
                  this.before = response.data.data.before;
                  this.after = response.data.data.after;
                  this.isLoading = false;
					  })
					  .catch(function (error) {
					   
					  }).finally( () => {
                        this.isLoading = false;
                      });

			}
		},
		created(){
            if((this.channel = this.$route.query.channel) && (this.acid = this.$route.query.acid) && (this.adaccount = this.$route.query.adaccount) ){
                this.fetch(this.channel,this.acid,this.adaccount);
            }
		        
            if(this.currency){
              this.$store.commit("SET_CURRENCY",this.currency);
            }	 
		}
	}

</script>