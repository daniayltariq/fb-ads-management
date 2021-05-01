<template>

<div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">

    <adset-create-modal :campaign="campaign_id" :channel="channel" :adaccount="adaccount" :token="acid" :active="campaign_modal" @close="adsetModalClose"></adset-create-modal>

    <div class="kt-container ">

        <div class="kt-portlet kt-portlet--tabs kt-portlet--height-fluid">
        	<div class="kt-portlet__head">
        		<div class="kt-portlet__head-label">
        			<h3 class="kt-portlet__head-title">
        				Adsets 
        			</h3>
        		</div>
        		 <div class="kt-portlet__head-toolbar">
                   <div class="d-flex align-items-center">
                       <button @click="campaign_modal = true" class="btn btn-sm btn-label-brand btn-bold">
                          Create Adset
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
                            
                            <th>#</th>
                            <th>Name</th>
                            <th>Daily Budget</th>
                            <th>Lifetime Budget</th>
                            <th>Status</th>
                            <th>Operation</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="(ac,i) in adsets">
                            <td>{{ i+1 }}</td>
                            <td>{{ ac.name }}</td>
                            <td>{{ ac.daily_budget }}</td>
                            <td>{{ ac.lifetime_budget }}</td>
                             
                            <td>
                                <span class="kt-switch--sm kt-switch">
                                <label>
                                <input @change="updateStatus(ac.status,ac)" type="checkbox" :checked="getStatus(ac.status)" value="1">
                                <span></span>
                                </label>
                                </span>
                                
                            </td>
                            <td>
                                <router-link :to="{ name: 'automation.adsets', params:{ campaign:ac.id }, query:{channel:channel,acid:acid}}" tag="a" class="btn btn-sm btn-label-brand btn-bold">
                                    Select
                                </router-link>
                            </td>
                        </tr>
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
	import AdsetCreateModal from './createModal';
	export default{
        components:{
            AdsetCreateModal
        },
		name:"AdSets",
		data(){
			return {

        campaign_modal:false,

				adsets:[],
        channel:"",
        acid:"",
        adaccount:"",
        campaign_id:"",
        isLoading:false,

        // Paging
        after:"",
        before:"",
             
                // Paging
			}
		},
		methods:{
 
            previous(){
                this.fetch(this.channel,this.acid,this.adaccount,this.before,false);
            },
            
            next(){
                this.fetch(this.channel,this.acid,this.adaccount,false,this.after);
            },

            adsetModalClose(val){
                this.campaign_modal = val.status;
                if(val.res == 'reload'){
                    this.fetch(this.channel,this.acid,this.adaccount);
                }
            },

            updateStatus(status){

                  //   var params = [
                  //    `channel=${channel}`,
                  //    `tk=${tk}`,
                  //    `adaccount=${adaccount}`,
                  //    `campaign=${campaign}`,
                  //    `status=${status}`,
                  // ];
                  //   params = params.join('&');
                  //   axios.get('/update_compaigns?'+params)
                  //     .then((response) => {
                  //        this.adsets = response.data.data.data;
                         
                  //           this.before = response.data.data.before;
                  //           this.after = response.data.data.after;
                         
                  //        this.isLoading = false;
                  //     })
                  //     .catch(function (error) {
                       
                  //     }).finally( () => {
                  //       this.isLoading = false;
                  //     });

                // }
            },

			fetch(campaign_id,channel,acid,adaccount,before = false,after = false){
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

    			  axios.get('/api/ad_compaign/'+campaign_id+'/adsets?'+params)
    					  .then((response) => {
    					     this.adsets = response.data.data.data;
                             
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
           

            if((this.channel = this.$route.query.channel) && ((this.acid = this.$route.query.acid) && (this.adaccount = this.$route.query.adaccount) )){

                this.campaign_id = this.$route.params.campaign;
                this.fetch(this.campaign_id,this.channel,this.acid,this.adaccount);
            }
			 
		}
	}

</script>