<template>
	
<div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">

  <campaign-create-modal :adaccount="adaccount" :acid="acid" :active="campaign_modal" @close="campaignModalClose"></campaign-create-modal>

    <div class="kt-container ">

        <div class="kt-portlet kt-portlet--tabs kt-portlet--height-fluid">
        	<div class="kt-portlet__head">
        		<div class="kt-portlet__head-label">
        			<h3 class="kt-portlet__head-title">
        				Ad Accounts
        			</h3>
        		</div>
        		 
        	</div>
            <div class="kt-portlet__body position-relative">

                <loading :active.sync="isLoading" 
                :can-cancel="false" 
                :is-full-page="false"></loading>

                <form-wizard @on-complete="onComplete" ref="wizard"   color="#fe3c3d" title="" subtitle="">

                 <tab-content title="Select A Campaign" :before-change="beforeFirstStepSwitch">

                    <div class="row">
                      <div class="col-md-4">
                          <div class="form-group">
                              <label>Rule Name *</label>
                              <input type="text" v-model="form.name" class="form-control">
                              <div class="text-danger mt-2" v-if="$v.form.name.$dirty && !$v.form.name.required">Field is required</div>  
                          </div>
                      </div>

                      <div class="col-md-4">
                         
                      </div>
                      <div class="col-md-4">
                        <!-- <div class="form-group mt-3">
                          <label for=""> </label>
                          <div class="row">
                            <div class="col-6">  <span>Ad Status</span></div>
                            <div class="col-6">
                              <span class="kt-switch--sm kt-switch">
                                <label>
                                <input v-model="form.ad_status" type="checkbox" :checked="true" value="true">
                                <span></span>
                                </label>
                                </span>
                            </div>
                          </div>
                        </div> -->
                      </div>

                    </div>

                    
                    <div id="compaign-table" v-if="!edit">

                        <hr>
                        <h3>Select A Campgain or <a href="#" @click="campaign_modal = true">Create</a></h3>
                        <hr>

                        <div class="row">
                            <div class="col-md-3">
                                <button @click="fetchCampaign({},channel,acid,adaccount,false,false,true);" type="button" class="btn btn-sm btn-secondary btn-icon"><i class="fa fa-undo"></i></button> <span v-if="campaigns_refreshed" v-text="campaigns_refreshed"></span>
                            </div>
                            <div class="col-md-6"></div>
                            <div class="col-md-3">
                                <div class="kt-input-icon kt-input-icon--left">
                                <input type="text" v-model="search_campaign" class="form-control" placeholder="Search...">
                                <span class="kt-input-icon__icon kt-input-icon__icon--left">
                                    <span><i class="la la-search"></i></span>
                                </span>
                            </div>
                            </div>
                        </div>
                         <div class="text-danger mt-2" v-if="$v.selected_campaign.$dirty && !$v.selected_campaign.required">Please select a campaign or <a href="#" @click="campaign_modal = true">create new</a> </div>
                        <table class="table table-head-bg-brand">

                          <thead class="thead-inverse">
                              <tr>
                                  <th></th>
                                  <th>Name</th>
                                  <th>Objective</th>
                                  <th>CBO</th>
                                  <th>Status</th>
                                  <th>Created On</th>
                                  <th>ID</th>
                              </tr>
                          </thead>

                          <tbody>
                              <tr v-for="(ac,i) in filteredRows" :key="ac.id">
                                   <td>
                                       <label class="kt-radio">
                                          <input type="radio" name="campaign"  @click="selectCampaign(ac)" :checked="form.campaign.id == ac.id" :value="ac.id">
                                          <span></span>
                                      </label>
                                   </td>
                                 
                                   <td>{{ ac.name }}</td>
                                   <td>{{ ac.objective }}</td>
                                   <td>{{ campaignCBO(ac.bid_strategy) }}</td>
                                   <td>{{ ac.status }}</td>
                                   <td>{{ formatDate(ac.created_time.date) }}</td>
                                      
                                   <td>
                                      {{ ac.id }}
                                   </td>
                              </tr>
                          </tbody>
                      </table>

                      <div class="pagination text-center">
                          <button  :disabled="!campaigns_before" @click="fetchCampaign({},channel,acid,adaccount,campaigns_before,false)" type="button" class="btn btn-sm btn-info mr-2">Previous Page</button>
                          <button :disabled="(!campaigns_after)"   @click="fetchCampaign({},channel,acid,adaccount,false,campaigns_after)" type="button" class="btn btn-sm btn-info">Next Page</button>
                      </div>
                      
                    </div>

                    
                 </tab-content>

                 <tab-content title="Ad Sets" :before-change="beforeSecondStepSwitch">

                    <div class="row">
                        <div class="col-md-6">
 
                            <div class="form-group ">
                                <label>Ad Set Name *</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="form.adSetMacro" required="">
                                    <div class="input-group-append">
                                        <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Macros
                                      </button>
                                        <div class="dropdown-menu">
                                            <span class="dropdown-item" @click="adsetNameMacro('{targeting_name}')">{targeting_name}</span>
                                            <span class="dropdown-item" @click="adsetNameMacro('{campaign_name}')">{campaign_name}</span>
                                            <span class="dropdown-item" @click="adsetNameMacro('{objective}')">{objective}</span>
                                            <span class="dropdown-item" @click="adsetNameMacro('{today}')">{today}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-danger mt-2" v-if="$v.form.adSetMacro.$dirty && !$v.form.adSetMacro.required">Field is required</div>
                            </div>

                            <div class="form-group">
                                <label>Billing Event *</label>
                                <select class="form-control" v-model="form.adSet.billingEvent">
                                    <option value="">Set Billing Event</option>
                                    <option v-for="(e,i) in billingEvents" :value="e">{{e}}</option>
                                </select>
                                 <div class="text-danger mt-2" v-if="$v.form.adSet.billingEvent.$dirty && !$v.form.adSet.billingEvent.required">Field is required</div>
                            </div>

                            <div class="form-group" v-if="!selected_campaign.bid_strategy || (selected_campaign.objective != 'LINK_CLICKS')">
                                <label>Budget *</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                         <select class="form-control" v-model="form.adSet.budgetType">
                                            <option value="daily">Daily Budget</option>
                                            <option value="life_time">Lifetime Budget</option>
                                        </select>
                                    </div>
                                    <input v-model="form.adSet.budgetAmount" type="text" class="form-control">                           
 
                                    <div class="input-group-append"><span class="input-group-text" id="basic-addon2">
                                        {{ currency }}
                                    </span></div>

                                </div> 

                                <div class="text-danger mt-2" v-if="$v.form.adSet.budgetType.$dirty && !$v.form.adSet.budgetType.required">Field is required</div>

                                <div class="text-danger mt-2" v-if="$v.form.adSet.budgetAmount.$dirty && !$v.form.adSet.budgetAmount.required">Field is required</div>

                            </div>

                            <!-- <div class="form-group">
                                <label>Run Ads For (days) *</label>
                                <input type="number" v-model="form.runAdsFor" class="form-control">
                                <div class="text-danger mt-2" v-if="$v.form.runAdsFor.$dirty && !$v.form.runAdsFor.required">Field is required</div>
                            </div> -->
 
                        </div>


                        <div class="col-md-6">

                            <div class="form-group">
                                <label>Ad Name *</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="form.AdNameMacro">
                                    <div class="input-group-append">
                                        <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Macros
                                      </button>
                                        <div class="dropdown-menu">
                                            <span class="dropdown-item" @click="adNameMacro('{campaign_name}')">{campaign_name}</span>
                                           <!--  <span class="dropdown-item" @click="adNameMacro('{adset_name}')">{adset_name}</span>
                                            <span class="dropdown-item" @click="adNameMacro('{targeting_name}')">{targeting_name}</span>
                                            <span class="dropdown-item" @click="adNameMacro('{objective}')">{objective}</span>
                                            <span class="dropdown-item" @click="adNameMacro('{today}')">{today}</span>
                                            <span class="dropdown-item" @click="adNameMacro('{post_id}')">{post_id}</span>
                                            <span class="dropdown-item" @click="adNameMacro('{creative_type}')">{creative_type}</span>
                                            <span class="dropdown-item" @click="adNameMacro('{creative_name_50}')">{creative_name_50}</span>
                                            <span class="dropdown-item" @click="adNameMacro('{creative_name_all}')">{creative_name_all}</span>
                                            <span class="dropdown-item" @click="adNameMacro('{triggers}')">{triggers}</span> -->
                                        </div>
                                    </div>
                                </div>
                                <div class="text-danger mt-2" v-if="$v.form.AdNameMacro.$dirty && !$v.form.AdNameMacro.required">Field is required</div>                   
                            </div>

                            <div class="form-group">
                                <label>Optimization Goal *</label>
                                <select class="form-control" v-model="form.adSet.optimizationGoal">
                                    <option value="">Set Optimization Goal</option>
                                    <option v-for="(g,i) in optimizationGoals" :value="g">{{ g }}</option>
                                </select>
                                <div class="text-danger mt-2" v-if="$v.form.adSet.optimizationGoal.$dirty && !$v.form.adSet.optimizationGoal.required">Field is required</div>
                            </div>

                            <div class="form-group ">
                                    <label>Bid Strategy *</label>
                                    <div class="input-group">
                                        <select v-model="form.adSet.bid_strategy" class="form-control">
                                            
                                            <option value="" selected="">None</option>
                                            <option value="LOWEST_COST_WITHOUT_CAP">LOWEST COST WITHOUT CAP</option>
                                            <option value="LOWEST_COST_WITH_BID_CAP">LOWEST COST WITH BID CAP</option>
                                            <option value="TARGET_COST">TARGET COST</option>
                                            <option value="COST_CAP">COST CAP</option>
                                        </select>
                                    </div>
                                    <!-- <div class="text-danger mt-2" v-if="$v.form.adSet.bid_strategy.$dirty && !$v.form.adSet.bid_strategy.required">Field is required</div> -->
                                </div>

                                <div class="form-group" v-if="!selected_campaign.bid_strategy">
                                    <label>Bid Amount *</label>
                                    <input type="number" v-model="form.adSet.bidAmount" class="form-control">
                                    <div class="text-danger mt-2" v-if="$v.form.adSet.bidAmount.$dirty && !$v.form.adSet.bidAmount.required">Field is required</div>
                                </div>
                        </div>

                    </div>
                    
                    <hr>

                    <div class="text-danger mt-2" v-if="audience_failed">{{ audience_failed }}</div>

                    <div class="row">
                      <div class="col-md-4">
                        <h3>Saved Audiences </h3>
                      </div>
                      <div class="col-md-4">
                        
                      </div>
                      <div class="col-md-4 text-md-right">
                        <span v-if="audience_refreshed" v-text="audience_refreshed"></span>
                        <button @click="fetchAudience(channel,acid,adaccount,false,false,true);" type="button" class="btn btn-sm btn-secondary btn-icon"><i class="fa fa-undo"></i></button>
                      </div>
                    </div>
                    <table class="table table-head-bg-brand">
                    <thead class="thead-inverse">
                        <tr>

                            <th>NAME</th>
                            <th>TARGETING</th>
                            <th>CREATED AT</th>
                            <th>LAST MODIFIED</th>

                        </tr>
                    </thead>
                    <tbody>
                      
                        <tr  v-for="(ac,i) in saved_audience" :key="'id_'+i" >
                           <td>
                           <label class="kt-radio">
                              <input type="radio" name="saved_audience"  @click="selectSavedAudience(ac)"  value="ac.id">
                              <span></span>
                          </label>
                       {{ ac.name }}
                         </td>
                           <td>
                             <ul>
                               <li>
                                 Location {{ ac.targeting.geo_locations.countries[0] }}
                               </li>
                               <li>
                                 Age {{ ac.targeting.age_min }} - {{ ac.targeting.age_max }}
                               </li>
                             </ul>
                           </td>
                           <td>{{ formatDate(ac.time_created) }}</td>
                           <td>
                              {{ formatDate(ac.time_updated) }}
                            </td>
                        </tr>

                    </tbody>
                </table>

                <div class="pagination text-center">
                    <button  :disabled="!saved_audience_before" type="button" class="btn btn-sm btn-info mr-2">Previous</button>
                    <button  :disabled="!saved_audience_after" type="button" class="btn btn-sm btn-info">Next</button>
                </div>

                <hr>
                <h3>Select Placements</h3>
                <button type="button" @click="form.is_auto_placement = true" class="btn btn-outline-primary btn-sm" :class="{ 'selected-btn' : (form.is_auto_placement == true) }">Automatic Placements (Recommended)</button>
                <button type="button" @click="form.is_auto_placement = false" class="btn btn-outline-primary btn-sm" :class="{ 'selected-btn' : (form.is_auto_placement == false) }">Edit Placements</button>

                <table class="table table-striped" v-if="!form.is_auto_placement">
                  <thead>
                  <tr>
                    <th>Platform Name</th>
                    <th>Platform Positions</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Device Platforms</td>
                    <td>
                      <label class="m-checkbox"><input v-model="form.adSet.targets[0].targeting.device_platforms" type="checkbox" value="mobile"><span></span></label> Mobile<br>
                      <label class="m-checkbox"><input v-model="form.adSet.targets[0].targeting.device_platforms" type="checkbox" value="desktop"><span></span></label> Desktop<br>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label class="m-checkbox">
                          <input type="checkbox" checked="" disabled><span></span></label>Facebook
                      </td>
                    <td>
                      <label class="m-checkbox"><input v-model="form.adSet.targets[0].targeting.facebook_positions" value="feed" type="checkbox"><span></span></label> Feeds<br>
                      <label class="m-checkbox"><input v-model="form.adSet.targets[0].targeting.facebook_positions" value="instant_article" type="checkbox"><span></span></label> Instant Articles<br>
                      <label class="m-checkbox"><input v-model="form.adSet.targets[0].targeting.facebook_positions" value="right_hand_column" type="checkbox"><span></span></label> Right Hand Column<br>
                      <label class="m-checkbox"><input v-model="form.adSet.targets[0].targeting.facebook_positions" value="marketplace" type="checkbox"><span></span></label> Marketplace<br>
                      <label class="m-checkbox"><input v-model="form.adSet.targets[0].targeting.facebook_positions" value="story" type="checkbox"><span></span></label> Stories
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label class="m-checkbox"><input v-model="form.adSet.targets[0].targeting.publisher_platforms" name="publisher_platforms" value="instagram" type="checkbox"><span></span></label>Instagram
                    </td>
                    <td>
                      <label class="m-checkbox"><input v-model="form.adSet.targets[0].targeting.instagram_positions" value="stream" type="checkbox"><span></span></label> Feeds<br>
                      <label class="m-checkbox"><input v-model="form.adSet.targets[0].targeting.instagram_positions" value="story" type="checkbox"><span></span></label> Stories
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label class="m-checkbox"><input type="checkbox" v-model="form.adSet.targets[0].targeting.publisher_platforms" name="publisher_platforms" value="audience_network"><span></span></label>Audience Network
                    </td>
                    <td>
                      <label class="m-checkbox"><input type="checkbox" v-model="form.adSet.targets[0].targeting.audience_network_positions" value="classic"><span></span></label> Native, Banner and Interestitial<br>
                      <label class="m-checkbox"><input type="checkbox" v-model="form.adSet.targets[0].targeting.audience_network_positions" value="instream_video"><span></span></label> In-stream Videos <br>
                      <label class="m-checkbox"><input type="checkbox" v-model="form.adSet.targets[0].targeting.audience_network_positions" value="rewarded_video"><span></span></label> Rewarded Videos
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label class="m-checkbox"><input type="checkbox" v-model="form.adSet.targets[0].targeting.publisher_platforms" name="publisher_platforms" value="messenger"><span></span></label>Messenger
                    </td>
                    <td>
                      <label class="m-checkbox"><input type="checkbox" v-model="form.adSet.targets[0].targeting.messenger_positions" value="sponsored_messages"><span></span></label> Inbox<br>
                      <label class="m-checkbox"><input type="checkbox" v-model="form.adSet.targets[0].targeting.messenger_positions" value="story"><span></span></label> Stories <br>
                      <label class="m-checkbox"><input type="checkbox" v-model="form.adSet.targets[0].targeting.messenger_positions" value="messenger_home"><span></span></label> Home
                    </td>
                  </tr>
                  </tbody>

                </table>

                <hr>
                <h4>Add Tracking to your ads</h4>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                        <label>UTM Tags</label>
                        <input type="text" v-model="form.tracking.urlTag" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-6">

                    <div class="form-group">
                        <label>Conversion Pixels</label>
                        <select v-model="form.conversion_pixels" class="form-control">
                             
                        </select>
                    </div>
                    
                  </div>
                </div>
                </tab-content>

                <tab-content title="Configure Rules and triggers" >

                   <h3>Configure the rules and triggers</h3>
                   <hr
                  <div class="row">
                    

                    <div class="col-md-4">
                       <div class="form-group ">
                            <label>Facebook Page *</label>
                            <div class="input-group">
                                <select v-model="sourcepage" class="form-control">
                                    <option v-for="(p,i) in facebook_pages" :value="i" selected="">{{ p.name }}</option>
                                </select>
                            </div>
                            <div class="text-danger mt-2" v-if="$v.sourcepage.$dirty && !$v.sourcepage.required">Field is required</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                       <div class="form-group ">
                            <label>Instagram Handle</label>
                            <div class="input-group">
                                <select v-model="form.instagram_actor_id" class="form-control">
                                    <option value="">None</option>
                                    <option v-for="(inst,i) in instagram_handles" :value="inst.id" :selected="(i == 0) ? true : false">{{ inst.username }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                  </div>

                <!--   <div class="row">
                    <div class="col-md-4">
                        <div class="form-group ">
                          <label>Rule Run Frequency *</label>
                          <div class="input-group">
                                <select class="form-control" v-model="form.lookbackWindow">
                                    <option value="">Select Rule Run Frequency</option>
                                    <option value="180">180</option>
                                    <option value="150">150</option>
                                    <option value="120">120</option>
                                    <option value="90">90</option>
                                    <option value="75">75</option>
                                    <option value="60">60</option>
                                    <option value="45">45</option>
                                    <option value="30">30</option>
                                    <option value="15">15</option>
                                    <option value="5">5</option>
                                </select>
                              <div class="input-group-append"><span class="input-group-text">
                                  Minutes
                              </span></div>                        
                          </div>                      
                      </div>
                    </div>

                    
                  </div>
 -->

                <div class="row">

                    <!-- <div class="col-md-3">
                          <label for="">Start Date</label>
                          <date-picker v-model="rule_start_date" value-type="format" type="date"></date-picker>
                    </div>
                    <div class="col-md-2">
                           <label for="">Start Time</label>
                          <date-picker v-model="rule_start_time" value-type="format" type="time" format="HH:mm"></date-picker>
                    </div> -->

                    <div class="col-md-3">
                          <label for="">End Date</label>
                          <date-picker v-model="rule_end_date" value-type="format" type="date"></date-picker>
                    </div>

                   <!--  <div class="col-md-2">
                          <label for="">End Time</label>
                          <date-picker v-model="rule_end_time" value-type="format" type="time" format="HH:mm"></date-picker>
                    </div> -->

                    <div class="col-md-2">
                         <div class="form-group">
                            <label>Timezone</label>
                            <input type="text" v-model="form.timezone_name" class="form-control">
                        </div>
                    </div>

                  </div>

                  <!-- Conditions -->
                  <hr>

                  <div>
                    
                    <div class="text-center mb-4">
                      <h3>
                        Boost posts that meet the following criteria:
                      </h3>
                    </div>
         
                     <div class="conditions mb-3" v-for="(item,i) in form.conditions">

                      <div class="row">

                        <div v-if="i != 0" class="col-md-2">
                          <select v-model="form.conditions[i].type" class="form-control">
                                <option value="">Select Condition</option>
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                          </select>
                        </div>
                       
                        <div class="col-md-2" :class="{ 'col-md-2' : i != 0, 'col-md-4' : i == 0, }">
 
                            <select  v-if="(i == 0 || form.conditions[i].type )" v-model="form.conditions[i].name" class="form-control">

                                <option value="" disabled selected="">Select Type</option>
                                <option value="Always Promote">Always Promote</option>
                                <option value="Comments">Comments</option>
                                <option value="Engagement Rate">Engagement Rate</option>
                                <option value="Post Id">POST ID</option>
                                <option value="Impressions">Impressions</option>
                                <option value="Likes">Likes</option>
                                <option value="Link">Link</option>
                                <option value="Message">Message</option>
                                <option value="Type">Type</option>
                                <option value="Video Views">Video Views</option>

                              </select>
         
                        </div>

                        <div class="col-md-2">

                          <div class="">

                            <select v-if="form.conditions[i].name== 'Comments' || form.conditions[i].name== 'Engagement Rate'
                              || form.conditions[i].name== 'Impressions' || form.conditions[i].name== 'Likes' || form.conditions[i].name== 'Shares'
                               || form.conditions[i].name== 'Video Views' " v-model="form.conditions[i].condition" class="form-control">
                              <option value="Is Greater Than">Is Greater Than</option>
                              <option value="Is Less Than">Is Less Than</option>
                              <option value="Is Equal To">Is Equal To</option>
                            </select>

                            <select v-if="form.conditions[i].name== 'Link' || form.conditions[i].name== 'Message'
                              || form.conditions[i].name== 'Headline'" v-model="form.conditions[i].condition" class="form-control">
                                <option value="Is Equal To">Is Equal To</option>
                                <option value="Contains">Contains</option>
                                <option value="Does Not Contain">Does Not Contain</option>
                            </select>

                            <select v-if="form.conditions[i].name== 'Instagram Eligible'" v-model="form.conditions[i].condition" class="form-control">
                               <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>

                            <select v-if="form.conditions[i].name== 'Type'" v-model="form.conditions[i].condition" class="form-control">
                                <option value="Link" v-if="channelType === 'fb'">Link</option>
                                <option value="Video">Video</option>
                                <option value="Photo" v-if="channelType === 'fb'">Photo</option>
                                <option value="Carousel" v-if="channelType === 'fb'">Carousel</option>
                            </select>

                            <select v-if="form.conditions[i].name== 'Instagram Eligible'" v-model="form.conditions[i].condition" class="form-control">
                                 <option></option>
                            </select>
                                 
                          </div>
                          
                        </div>

                        <div class="col-md-3">

                          <div v-if="(form.conditions[i].condition && (form.conditions[i].name && form.conditions[i].name !== 'Always Promote' && form.conditions[i].name !== 'Post Id'
                             && form.conditions[i].name !== 'Instagram Eligible' && form.conditions[i].name !== 'Link' && form.conditions[i].name !== 'Message' && form.conditions[i].name !== 'Type' && form.conditions[i].name !== 'Engagement Rate') )" class="input-group">
                              <input v-model="form.conditions[i].value" class="form-control" type="number">
                          </div>

                          <div v-if="(form.conditions[i].condition && (form.conditions[i].name == 'Link' || form.conditions[i].name == 'Message' || form.conditions[i].name == 'Post Id' ))" class="input-group">
                              <input v-model="form.conditions[i].value" class="form-control" placeholder="" type="text">
                          </div>

                          <div v-if="(form.conditions[i].condition  && (form.conditions[i].name == 'Engagement Rate'))" class="input-group">
                              <input v-model="form.conditions[i].value" class="form-control" placeholder="" type="number">
                              <div class="input-group-append">
                                <span class="input-group-text">%</span>
                              </div>
                          </div>

                        </div>
                       
                        <div class="col-md-1">
                          <div class="">
                             
                            <div class="row">
                              <div class="col-6">

                                <span class="kt-switch--sm kt-switch">
                                  <label>

                                  <input  type="checkbox" v-model="form.conditions[i].status" :checked="true" :value="true">
                                  <span></span>

                                  </label>
                                  </span>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-1">
                          <span @click="removeCondition(i)" class="cursor-pointer"><i class="fa fa-times fa-lg"></i></span>
                        </div>
                        
                      </div>
                      
                    </div>

                      
                    <div class="conditions-footer">

                      <div class="text-center">

                        <span @click="addNewCondition" class="mt-3 btn btn-primary"><i class="fa fa-plus"></i> Condition</span>
                        
                      </div>
                      
                    </div>

                  </div>

                  <!-- Conditions -->
                  <hr>
                   <div class="text-center mb-5">
                    <h3>
                      Email Reminder
                    </h3>
                  </div>

                  <div class="row">
                    <div class="form-inline col-md-4">
                       
                     <div class="form-group">
                        <label for="email" class="mr-2">Send Email To</label>
                        <input type="email" v-model="form.actions[0].value" class="form-control" id="email">

                        
                      </div>
                        
                    </div>
                    <div class="col-md-6">
                        <p class="mb-2">(You can enter multiple email addresses by separating with a ‘,’)</p>
                    </div>
                    
                  </div>


                </tab-content>

            

             </form-wizard>

            </div>
            

        </div>

	</div>
      
</div>
</template>

<script>
	import CampaignCreateModal from '@/FrontApp/Views/Campaign/createModal';
  import { required } from 'vuelidate/lib/validators';
  import { mapState } from 'vuex';
	export default{
    components:{
            CampaignCreateModal
        },
		name:"CreateRules",
		data(){
			return {

               edit:false,
               editID:'',
               edit_data:{},
               optimizationGoals:[],
               billingEvents:[],
                // validations messages
                audience_failed:'',

                error_title : '',
                error_message : '',
                // validations messages
                
                sourcepage : '0',
                form: {

                    AdNameMacro:"",
                    adSetMacro:"",
                    actions:[
                    {
                        name: "Send Email To", 
                        value: "", 
                        status: true
                      }
                    ],
                    adSet:{
                      adName:'',
                      adSetName:'',
                      bidAmount:'',
                      bid_strategy:'',
                      budgetType:'daily',
                      budgetAmount: "",

                      billingEvent:'',
                      campaignId:'',
                      currency:'',
                      
                      isExiting:false,
                      is_autobid:false,
                      optimizationGoal:'',

                      targets:[

                        {
                          id:'',
                          name:'',
                          adSetName:'',
                          adName:'',

                          targeting:{
                            age_max:0,
                            age_min:0,

                            device_platforms:["mobile", "desktop"],

                            facebook_positions:["feed", "instant_article", "right_hand_column", "marketplace", "story"],

                            flexible_spec:[
                              // {
                              //   interests:[
                              //   {id: "", name: ""}
                              //   ]
                              // }
                            ],

                            genders:[0],
                            geo_locations:{
                              countries:[],
                              location_types:["home", "recent"],
                            },
     
                            instagram_positions:["stream", "story"],

                          
                            audience_network_positions:["classic", "instream_video", "rewarded_video"],
     
                            messenger_positions:["story", "messenger_home"],

                            publisher_platforms:["facebook", "instagram", "audience_network", "messenger"],

                            // time_created: "2020-08-06T08:44:45+0000",
                            // time_updated: "2020-08-06T08:44:45+0000"

                         }
                        }
                      ]
                    },
                  
                    ad_account_id:"",
                    ad_status:true,
                    adset_status:true,
                    audienceSelected:false,

                    campaign:{},
                    campaign_name: "",
                    campaign_objective: "",
                    channel: "fb",

                    conditions:[
                       {
                        name: "",
                        type: "",
                        condition: "",
                        status: "1",
                        value: "",
                       
                       }
                    ],

                    datasource: "Posts",
                    enableAdGrouping: true,
                    instagram_actor_id: "",
                    is_auto_placement: true,
                    lookbackWindow: 180,
                    name: "",
                    preview: false,
                    ruleEmailAlertOnly: false,
                    runAdsFor: 5,
                    sourcepage: "",

                    startDate:{
                      day: 12,
                      month: 11,
                      year: 2020
                    },

                    startDateTime: "Nov 12, 2020 11:46 am",

                    startTime: {
                      hour: 11,
                      minute: 46
                    },

                    endDate:{
                      day: 12,
                      month: 12,
                      year: 2020
                    },

                    endDateTime: "Nov 12, 2020 11:46 am",

                    endTime: {
                      hour: 11,
                      minute: 46
                    },

                    timezone_name : "Australia/Sydney",

                    tracking:{
                      urlTag :"utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}"
                    },

                  },
                

                // ^^^From API SOURCE


                campaign_modal:false,

                facebook_pages:[],
                instagram_handles:[],

                selected_campaign_id:"",
                selected_campaign:{},
                search_campaign:"",

                campaigns:[],
                campaigns_refreshed:'',
                campaigns_after:"",
                campaigns_before:"",

                placement_type:'automatic',
                saved_audience:[],
                audience_refreshed:'',
                saved_audience_after:"",
                saved_audience_before:"",
                saved_audience_vmodel:[],

                accounts:[],
                channel:"",
                adaccount:"",
                acid:"",
                isLoading:false,

                ad:{
                  name:'',
                },
 
                conversion_pixels:[],
                ad_pixels:[],

                rule_start_date: this.formatDate(new Date(),'YYYY-MM-DD'),                
                rule_start_time: this.formatDate(new Date(),'HH:mm'),                
                rule_end_date:  this.formatDate(new Date(),'YYYY-MM-DD'),                
                rule_end_time:  this.formatDate(new Date(),'HH:mm'),                
                  
			}
		},


    validations: {
      form: {
        name : {
          required
        },

        actions:{
          $each: {
            value: {
              required
            }
          }
        },

        adSetMacro : {
          required
        },
        AdNameMacro : {
          required
        },
        adSet : {
           
           billingEvent:{
            required  
           },
           optimizationGoal:{
            required
           },
           budget:{
            required
           },
           budgetType:{
            required
           },

           budgetAmount:{
            required
           },

           bidAmount:{
            required
           },

           bid_strategy:{
            required
           },
        },

        runAdsFor:{
          required
        }
      },
      sourcepage:{
        required
      },
      selected_campaign:{
        required
      },
      
    },

    computed:{
       ...mapState(['currency']),
      filteredRows(){
        return this.campaigns.filter(row => {
          const name = row.name.toString().toLowerCase();
          const objective = row.objective.toLowerCase();
          const ids = row.id.toLowerCase();
          const searchTerm = this.search_campaign.toLowerCase();

          return name.includes(searchTerm) ||
            objective.includes(searchTerm) ||
            ids.includes(searchTerm);
        });
      }
    },
		methods:{
            setErrorMsg(){

            },
            campaignCBO(bid_strategy){
              if(bid_strategy){
                return 'Yes';
              }else{
                return '--';
              }
            },

            campaignModalClose(val){
                this.campaign_modal = val.status;
                if(val.res == 'reload'){
                    this.fetch(this.channel,this.acid,this.adaccount);
                }
            },

            fetchCampaign(filters,channel,acid,adaccount,before = false,after = false,refresh = false){
                
                this.isLoading = true;
                var params = [
                     `channel=${channel}`,
                     `acid=${acid}`,
                     `adaccount=${adaccount}`,
                     `filters=${encodeURI(JSON.stringify(filters))}`,
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
                          if(!filters.id){
                            this.campaigns = response.data.data.data;
                            this.campaigns_before = response.data.data.before;
                            this.campaigns_after = response.data.data.after;
                          }else{
                            
                            if(response.data.data.data.length > 0){
                              // this.selected_campaign = response.data.data.data[0];
                              this.selectCampaign(response.data.data.data[0]);
                            }
                            
                          }
                          
                          this.isLoading = false;
                      })
                      .catch(function (error) {
                       
                      }).finally( () => {
                        this.isLoading = false;
                        if(refresh){
                          this.campaigns_refreshed = 'Refreshed At '+this.formatDate(new Date(),'hh:mm A');
                        }
                      });
            },

            objectToFormData(obj, form, namespace) {
    
              var fd = form || new FormData();
              var formKey;
              
              for(var property in obj) {
              
                if(obj.hasOwnProperty(property)) {
                  
                  if(namespace) {
                    formKey = namespace + '[' + property + ']';
                  } else {
                    formKey = property;
                  }
                  
                  // Check if Date Object
                  if(obj[property] instanceof Date){
                    
                    fd.append(formKey, this.formatDateToUtc(new Date(obj[property])));
   
                  }else if(obj[property] == null){
                    fd.append(formKey, "");
                  }else if(typeof obj[property] !== 'undefined'){
                    fd.append(formKey, "");
                  }else if(typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
                    this.objectToFormData(obj[property], fd, property);
                  } else {
              
                    fd.append(formKey, obj[property]);
                  }

                }
              }
            
              return fd;
              
          },

          adSetMacro(macro){

          },

          onComplete: function(){
 
              this.$v.sourcepage.$touch();
              if(this.form.conditions.length == 1){
                 
                if(!this.form.conditions[0].name){
                 return false;
                }

              }else if(this.form.conditions.length == 0){
                
                return false;
              }
              
              if(this.$v.sourcepage.$anyError){
               
                return false;
              } 
 

                this.isLoading = true;
                    var params = [
                     `channel=${this.channel}`,
                     `acid=${this.acid}`,
                     `adaccount=${this.adaccount}`,
                  ].join('&');

                  // Prepare the request
                  this.formatAdSetName();
                  this.form.adSet.adName = this.form.AdNameMacro;                      
                   
                
                  this.form.adSet.currency = this.currency;

                  // Target
                  this.form.adSet.targets[0].adName = this.form.AdNameMacro;
                  this.form.adSet.targets[0].adSetName = this.form.adSetMacro;
 
                   
                  this.form.startDateTime = moment(this.rule_start_date +' '+this.rule_start_time).format('MMM DD YYYY hh:mm A');
                  this.form.endDateTime = moment(this.rule_end_date +' '+this.rule_end_time).format('MMM DD YYYY hh:mm A');

                 // console.log(moment(this.rule_start_date +' '+this.rule_start_time).format('MMM, DD YYYY hh:mm A'));
                  // Dates
                 
                if(this.edit){
                  
                  var api = '/api/fb/rules/'+this.adaccount+'/'+this.editID+'?'+params;
                }else{
                  var api = '/api/fb/rules/'+this.adaccount+'?'+params;
                }
                
                axios.post(api,this.form)
                .then((response) => {
                   
                    if(this.getPropIfExist(response.data,'error')){
                        if(response.data.error.code == 190){

                            this.notifyFailed('Please Reconnect your Facebook Account');
                            this.$router.push('/app/automation/accounts?channel=fb&reconnect=');
                            return false;

                        }else if(response.data.error){

                            console.log('response.data.error');
                            this.notifyFailed(response.data.error.message,response.data.error.title);
                           
                        }
                    }else{

                        if(response.data.message){
                          this.notifySuccess(response.data.message);
                          this.$router.push('/app/automation/rules?channel=fb&adaccount='+this.adaccount+'&acid='+this.acid);
                        }
                        
                    }
                                           
                })
                .catch((error) => {
                   
                  if(this.getPropIfExist(error.response.data,'error')){

                     this.error_title   = error.response.data.error.title;
                     this.error_message = error.response.data.error.message;

                     this.notifyFailed(error.response.data.error.message,error.response.data.error.title);

                  }
                 
                }).finally( (error) => {

                            this.isLoading = false;
                          });
                   
               },

			     fetch(channel,acid){
                this.isLoading = true;
                var params = [
                 `channel=${channel}`,
                 `acid=${acid}`,
              ].join('&');

				    axios.get('/api/adaccounts?'+params)
					  .then((response) => {

                        if(this.getPropIfExist(response.data,'error')){
                            if(response.data.error.code == 190){
                                this.notifyFailed('Please Reconnect your Facebook Account');
                                this.$router.push('/app/automation/accounts?channel=fb&reconnect=');
                            }
                        }else{
                            this.accounts = response.data.data;
                        }
                        
                         // if(){
                         // }else{
                         //     this.accounts = response.data.data;
                         //     this.isLoading = false;
                         // }
					     
					  })
					  .catch(function (error) {
					   
					  }).finally( () => {
                        this.isLoading = false;
                      });

			},

      fetchAudience(channel,acid,adaccount,before = false,after = false,refresh = false){

                this.isLoading = true;
                var params = [
                 `channel=${channel}`,
                 `acid=${acid}`,
                 `adaccount=${adaccount}`,
              ].join('&');

                if(before){
                    params.push(`before=${before}`);
                }
                if(after){
                    params.push(`after=${after}`);
                }
            
            axios.get('/api/saved_audience/'+adaccount+'?'+params)
            .then((response) => {

                        if(this.getPropIfExist(response.data,'error')){
                            if(response.data.error.code == 190){
                                this.notifyFailed('Please Reconnect your Facebook Account');
                                this.$router.push('/app/automation/accounts?channel=fb&reconnect=');
                            }
                        }else{
                            this.saved_audience = response.data.data.data;
                            this.saved_audience_before = response.data.data.before;
                            this.saved_audience_after = response.data.data.after;
                        }
                        
                         // if(){

                         // }else{
                         //     this.accounts = response.data.data;
                         //     this.isLoading = false;
                         // }
            })
            .catch(function (error) {
             
            }).finally( () => {
                        this.isLoading = false;
                        if(refresh){
                          this.audience_refreshed = 'Refreshed At '+this.formatDate(new Date(),'hh:mm A');
                        }
                      });
      },


      fetchPixels(channel,acid,adaccount){

                this.isLoading = true;
                var params = [
                 `channel=${channel}`,
                 `acid=${acid}`,
                 `adaccount=${adaccount}`,
              ].join('&');

            axios.get('/api/ad_pixels/'+adaccount+'?'+params)
            .then((response) => {

                      if(this.getPropIfExist(response.data,'error')){
                          if(response.data.error.code == 190){
                              this.notifyFailed('Please Reconnect your Facebook Account');
                              this.$router.push('/app/automation/accounts?channel=fb&reconnect=');
                          }
                      }else{
                          this.conversion_pixels = response.data.data.data;
                      }
               
            })
            .catch(function (error) {
             
            }).finally( () => {
                        this.isLoading = false;
                      });

      },


      fetchFacebook(channel,acid,adaccount){

                this.isLoading = true;
                var params = [
                 `channel=${channel}`,
                 `acid=${acid}`,
                 `adaccount=${adaccount}`,
              ].join('&');

            axios.get('/api/pages/accounts?'+params)
            .then((response) => {
                  if(this.getPropIfExist(response.data,'error')){
                      if(response.data.error.code == 190){
                          this.notifyFailed('Please Reconnect your Facebook Account');
                          this.$router.push('/app/automation/accounts?channel=fb&reconnect=');
                      }
                  }else{


                      this.facebook_pages = response.data.data;

                      if(response.data.data.length > 0){

                        this.form.sourcepage = this.facebook_pages[0].id;
                        this.fetchInstagram(this.channel,this.acid,this.adaccount,this.facebook_pages[0].id,this.facebook_pages[0].access_token);

                      }
                      
                  
                  }    
            })
            .catch(function (error) {
             
            }).finally( () => {
                        this.isLoading = false;
                      });

      },


       fetchInstagram(channel,acid,adaccount,page_id,access_tkn){
                this.isLoading = true;
                var params = [
                 `channel=${channel}`,
                 `acid=${acid}`,
                 `adaccount=${adaccount}`,
                 `access_tkn=${access_tkn}`,
              ].join('&');

            axios.get('/api/'+page_id+'/instagram_accounts?'+params)
            .then((response) => {

                  if(this.getPropIfExist(response.data,'error')){
                      if(response.data.error.code == 190){
                          this.notifyFailed('Please Reconnect your Facebook Account');
                          this.$router.push('/app/automation/accounts?channel=fb&reconnect=');
                      }
                  }else{
                      this.instagram_handles = response.data.data;
                  
                  }
                                       
            })
            .catch(function (error) {
            }).finally( () => {
                        this.isLoading = false;
                      });

      },


      selectCampaign(ac){

        this.selected_campaign_id = ac.id;
        this.selected_campaign = ac;

        this.form.campaign.account_id      = this.acid;
        this.form.campaign.bid_strategy    = ac.bid_strategy ?? "";
        this.form.campaign.created_time    = ac.created_time.date;
     
        this.form.campaign.id              = ac.id;
        this.form.campaign.name            = ac.name;

        this.form.campaign.status          = ac.status;
        this.form.campaign.start_time      = ac.start_time.date;
        if(ac.stop_time){
           this.form.campaign.stop_time       = ac.stop_time;
        }
       
        this.form.campaign.objective       = ac.objective;
      
        if(ac.lifetime_budget){
            this.form.campaign.lifetime_budget = ac.lifetime_budget;
        }else{
           this.form.campaign.lifetime_budget = null;
        }
        
        if(ac.daily_budget){
          this.form.campaign.daily_budget    = ac.daily_budget;
        }else{
          this.form.campaign.daily_budget    = null;
        }
        this.form.campaign.rowSelected       = true;

        this.form.campaign_name              = ac.name;
        this.form.campaign_objective         = ac.objective;
      
        // Adset
        this.form.adSet.campaignId = ac.id;
        // Adset
 
        if(!this.getPropIfExist(this.form.campaign,'bid_strategy')){
          this.form.campaign.bid_strategy = "";
        }

        // Set Bid Strategy in Adset
        if(ac.bid_strategy && ac.bid_strategy != undefined){
          console.log('Set Bid Strategy in Adset');
          this.form.adSet.bid_strategy = ac.bid_strategy;
        }
        
        this.getOptimizationGoals();
        this.getBillingEvents();
        this.fetchAudience(this.channel,this.acid,this.adaccount);
        this.fetchFacebook(this.channel,this.acid,this.adaccount);
        this.fetchPixels(this.channel,this.acid,this.adaccount);

        // this.$refs.wizard.changeTab(0,1);

      },

      selectSavedAudience(aud){
        
        this.form.adSet.targets[0].id = aud.id;
        this.form.adSet.targets[0].name = aud.name;
        this.form.adSet.targets[0].targeting.rowSelected = aud.rowSelected;
        this.form.adSet.targets[0].targeting.age_max = aud.targeting.age_max;
        this.form.adSet.targets[0].targeting.age_min = aud.targeting.age_min;

        this.form.adSet.targets[0].targeting.flexible_spec = aud.targeting.flexible_spec;
        this.form.adSet.targets[0].targeting.genders = aud.targeting.genders;
        this.form.adSet.targets[0].targeting.geo_locations = aud.targeting.geo_locations;
        this.form.audienceSelected = true;
      },

      // Form Related
      adsetNameMacro(macro){
        if(this.form.adSetMacro){
          this.form.adSetMacro = this.form.adSetMacro+'_'+macro;
        }else{
          this.form.adSetMacro = macro;
        }
      },

      adNameMacro(macro){
        if(this.form.AdNameMacro){
          this.form.AdNameMacro = this.form.AdNameMacro+'_'+macro;
        }else{
          this.form.AdNameMacro = macro;
        }
      },
      // Form Related

      newCondition(){

        return {
 
            name: "",
            condition: "",
            status: "1",
            type: "",
            value: "",
            
        }

      },

      addNewCondition(){

        this.form.conditions.push(this.newCondition());
              
      },

      removeCondition(i){
        this.form.conditions.splice(i,1);
      },

      stepChangeEvent(current,next){
       
        window.scrollTo(0, 0);
        
        if(current == 0){
           return false;
          // Validation
          if(!form.name){
            return false;
          }
          // Validation

        }

      },
 
      // conditionInputEnable($type){

      // },
 

      beforeFirstStepSwitch(){
         return new Promise ((resolve,reject) => {
            this.$v.form.name.$touch();
            this.$v.selected_campaign.$touch();
            if(this.$v.form.name.$anyError){
              reject();
              return false;
            }if(this.$v.selected_campaign.$anyError){
              reject();
              return false;
            }else{
              resolve();
              this.$refs.wizard.changeTab(0,1);

            }
         });
      },

      beforeSecondStepSwitch(){

        return new Promise ((resolve,reject) => {

          this.$v.form.AdNameMacro.$touch();
          this.$v.form.adSetMacro.$touch();
          this.$v.form.adSet.billingEvent.$touch();
          this.$v.form.adSet.optimizationGoal.$touch();
          this.$v.form.adSet.bid_strategy.$touch();
          this.$v.form.runAdsFor.$touch();

          if(this.selected_campaign.bid_strategy){
            this.$v.form.adSet.budgetType.$touch();
            this.$v.form.adSet.budgetAmount.$touch();
          }

          this.$v.form.adSet.bidAmount.$touch();

          if(!this.form.adSet.targets[0].id){
            this.audience_failed = 'Please select audience.';
            console.log('Failed On Step 2.1');
            reject();
            return false;
          }

          if(this.$v.form.AdNameMacro.$anyError){
            console.log('Failed On Step 2.2');
            reject();
            return false;
          }

          if(this.$v.form.adSetMacro.$anyError){
            console.log('Failed On Step 2.3');
            reject();
            return false;
          }

          if(this.$v.form.adSet.billingEvent.$anyError){
            console.log('Failed On Step 2.4');
            reject();
            return false;
          }

          if(this.$v.form.adSet.optimizationGoal.$anyError){
            console.log('Failed On Step 2.8');
            reject();
            return false;
          }

          if(!this.selected_campaign.bid_strategy && this.$v.form.adSet.budgetAmount.$anyError){
            console.log('Failed On Step 2.5');
            reject();
            return false;
          }
   
          if(!this.selected_campaign.bid_strategy && this.$v.form.adSet.budgetType.$anyError){
            console.log('Failed On Step 2.7');
            reject();
            return false;
          }

          if(this.$v.form.runAdsFor.$anyError){
            console.log('Failed On Step 2.9');
            reject();
            return false;
          }

          if(this.$v.form.adSet.bid_strategy.$anyError){
            console.log('Failed On Step 2.10');
            reject();
            return false;
          }
          resolve();
          this.$refs.wizard.changeTab(1,2);

        });
      },

      beforeFinalStepSwitch(){

        return new Promise ((resolve,reject) => {

            this.$v.sourcepage.$touch();
              if(this.form.conditions.length == 1){
                 
                if(this.form.conditions[0].name){
                   resolve();
                   return true;
                }else{
                   reject();
                   return false;
                }

              }else if(this.form.conditions.length == 0){
                reject();
                return false;
              }
              
              if(this.$v.sourcepage.$anyError){
                reject();
                return false;
              }else{

              resolve();
              return true;
            }

        });
      },


      formatAdSetName() {
        
        // AdsetName 
        this.form.adSet.adSetName = this.form.adSetMacro;
        this.form.adSet.adSetName = _.replace(this.form.adSet.adSetName, '{targeting_name}', this.form.adSet.targets[0].name);
        this.form.adSet.adSetName = _.replace(this.form.adSet.adSetName, '{campaign_name}', this.selected_campaign.name);
        this.form.adSet.adSetName = _.replace(this.form.adSet.adSetName, '{objective}', this.selected_campaign.objective);
        this.form.adSet.adSetName = _.replace(this.form.adSet.adSetName, '{today}', moment().format('MMMDD'));

        this.form.adSet.targets.forEach((target) => {
          target.adSetName = this.form.adSet.adSetName;
        });

        // Ad Name
        this.form.adSet.adName = this.form.AdNameMacro;
        this.form.adSet.adName = _.replace(this.form.adSet.adName, '{targeting_name}', this.form.adSet.targets[0].name);
        this.form.adSet.adName = _.replace(this.form.adSet.adName, '{campaign_name}', this.selected_campaign.name);
        this.form.adSet.adName = _.replace(this.form.adSet.adName, '{objective}', this.selected_campaign.objective);
        this.form.adSet.adName = _.replace(this.form.adSet.adName, '{today}', moment().format('MMMDD'));

        this.form.adSet.targets.forEach((target) => {
          target.adName = this.form.adSet.adName;
        });

      //   if(!this.showExistingAdsets && this.rule.adSet.targets.length && this.rule.adSet.adSetName) {
          
      //   }else {
      //        if((this.rule.adsets !== undefined && !this.rule.targetSelected) || (this.rule.adsets !== undefined && this.rule.audienceSelected)) {
      //      console.log(this.rule.adSet, '==adset name 1 =============');

      //        this.rule.adsets = _.map(this.rule.adsets, target => {

      //         console.log(this.rule.adSet, '==adset name 2 =============');

      //         target.adSetName = this.rule.adSet.adSetName;
      //         var tName = (target.targets)?target.targets.name:target.name;

      //         target.adSetName = _.replace(target.adSetName, '{targeting_name}', tName);
      //         target.adSetName = _.replace(target.adSetName, '{adset_name}', tName);
      //         target.adSetName = _.replace(target.adSetName, '{campaign_name}', this.selectedCampaign.name);
      //         target.adSetName = _.replace(target.adSetName, '{objective}', this.selectedCampaign.objective);
      //         target.adSetName = _.replace(target.adSetName, '{today}', moment().format('MMMDD'));

      //         return target;
      //       });
      //     } else {
      //       this.rule.adSet.targets = _.map(this.rule.adSet.targets, target => {
      //         target.adSetName = this.rule.adSet.adSetName;

      //         console.log(target.adSetName, '===start= adset name');
      //         console.log(target.name, '===audience name');

      //         target.adSetName = _.replace(target.adSetName, '{targeting_name}', target.name);
      //         target.adSetName = _.replace(target.adSetName, '{adset_name}', target.name);
      //         target.adSetName = _.replace(target.adSetName, '{campaign_name}', this.selectedCampaign.name);
      //         target.adSetName = _.replace(target.adSetName, '{objective}', this.selectedCampaign.objective);
      //         target.adSetName = _.replace(target.adSetName, '{today}', moment().format('MMMDD'));
      //         console.log(target.adSetName, '===end= adset name');
             
      //         return target;
      //       });
      //     }
      // }

      // console.log(this.rule.adSet,'after mapping === Adset ===');

      },


      formatAdName() {

        
      },

      getOptimizationGoals() {
        if(this.selected_campaign.objective == 'BRAND_AWARENESS') {
          this.optimizationGoals = ['AD_RECALL_LIFT'];
        } else if(this.selected_campaign.objective == 'REACH') {
          this.optimizationGoals = ['REACH', 'IMPRESSIONS'];
        } else if(this.selected_campaign.objective == 'POST_ENGAGEMENT') {
          this.optimizationGoals = ['POST_ENGAGEMENT', 'IMPRESSIONS'];
        } else if(this.selected_campaign.objective == 'APP_INSTALLS') {
            this.optimizationGoals = ['LINK_CLICKS', 'APP_INSTALLS'];
        } else if(this.selected_campaign.objective == 'VIDEO_VIEWS') {
          this.optimizationGoals = ['VIDEO_VIEWS'];
        } else if(this.selected_campaign.objective == 'LEAD_GENERATION') {
          this.optimizationGoals = ['LEAD_GENERATION'];
        } else if(this.selected_campaign.objective == 'CONVERSIONS') {
          this.optimizationGoals = ['LINK_CLICKS', 'LANDING_PAGE_VIEWS', 'IMPRESSIONS', 'OFFSITE_CONVERSIONS', 'VALUE'];
        }
        else if(this.selected_campaign.objective == 'LINK_CLICKS') {
          this.optimizationGoals = ['LINK_CLICKS', 'LANDING_PAGE_VIEWS', 'IMPRESSIONS', 'REACH'];
        }

        /*this.optimizationGoals = [
          'NONE', 'APP_INSTALLS', 'BRAND_AWARENESS', 'AD_RECALL_LIFT', 'CLICKS', 'ENGAGED_USERS',
          'EVENT_RESPONSES', 'IMPRESSIONS', 'LEAD_GENERATION', 'LINK_CLICKS', 'OFFER_CLAIMS',
          'OFFSITE_CONVERSIONS', 'PAGE_ENGAGEMENT', 'PAGE_LIKES', 'POST_ENGAGEMENT', 'REACH',
          'SOCIAL_IMPRESSIONS', 'VIDEO_VIEWS', 'APP_DOWNLOADS', 'LANDING_PAGE_VIEWS', 'VALUE', 'REPLIES'
        ]*/
      },

      getBillingEvents() {

        this.billingEvents = [];
        if(this.selected_campaign.objective == 'BRAND_AWARENESS') {
          this.billingEvents = ['IMPRESSIONS'];
        } else if(this.selected_campaign.objective == 'REACH') {
          this.billingEvents = ['IMPRESSIONS'];
        } else if(this.selected_campaign.objective == 'POST_ENGAGEMENT') {
          this.billingEvents = ['IMPRESSIONS'];
        } else if(this.selected_campaign.objective == 'APP_INSTALLS') {
          this.billingEvents = ['IMPRESSIONS','LINK_CLICKS'];
        } else if(this.selected_campaign.objective == 'VIDEO_VIEWS') {
          this.billingEvents = ['IMPRESSIONS'];
        } else if(this.selected_campaign.objective == 'LEAD_GENERATION') {
          this.billingEvents = ['IMPRESSIONS'];
        } else if(this.selected_campaign.objective == 'CONVERSIONS') {
          this.billingEvents = ['IMPRESSIONS'];
        } else if(this.selected_campaign.objective == 'LINK_CLICKS') {
          this.billingEvents = ['IMPRESSIONS','LINK_CLICKS'];
        }

        //this.billingEvents = ['APP_INSTALLS', 'CLICKS', 'IMPRESSIONS', 'LINK_CLICKS', 'NONE', 'OFFER_CLAIMS', 'PAGE_LIKES', 'POST_ENGAGEMENT', 'VIDEO_VIEWS'];
      },

      // Edit Rule
      // editRule(rule){

      //   this.form.name = rule.name;
      //   this.form.adSetMacro = rule.adset_name;
      //   this.form.AdNameMacro = rule.ad_name;
      //   this.form.adSet.billingEvent = rule.billing_event;
      //   this.form.adSet.optimizationGoal = rule.optimization_goal;

      //   if(rule.daily_budget){
      //     this.form.adSet.budgetAmount = rule.daily_budget;
      //     this.form.adSet.budgetType = 'daily';
      //   }
      //   if(rule.lifetime_budget){
      //     this.form.adSet.budgetAmount = rule.lifetime_budget;
      //     this.form.adSet.budgetType = 'lifetime';
      //   }

      //   // set Campaign
      //   this.form.campaign.id = rule.campaign_id;
      //   this.fetchCampaign({id:rule.campaign_id},this.channel,this.acid,this.$route.query.adaccount);
       
        
      //   // Set Targets
      //   this.form.adSet.targets[0].targeting = JSON.parse(rule.rule_targets[0].targeting)
      //   this.form.adSet.targets[0].id = rule.rule_targets[0].audience_id;
      //   this.form.adSet.targets[0].name = rule.rule_targets[0].name;

      //   this.form.source_page = rule.source_page;
      //   this.form.instagram_actor_id = rule.instagram_actor_id;

      //   this.form.conditions = rule.rule_trigger;

      // },

      editRule(rule){

        this.form.name = rule.name;
        this.form.adSetMacro = rule.adSetName;
        this.form.AdNameMacro = rule.adName;
        this.form.adSet.billingEvent = rule.billing_event;
        this.form.adSet.optimizationGoal = rule.optimization_goal;

        if(rule.daily_budget){
          this.form.adSet.budgetAmount = rule.daily_budget;
          this.form.adSet.budgetType = 'daily';
        }
        if(rule.lifetime_budget){
          this.form.adSet.budgetAmount = rule.lifetime_budget;
          this.form.adSet.budgetType = 'lifetime';
        }

        // set Campaign
        this.form.campaign.id = rule.campaign_id;
        this.fetchCampaign({id:rule.campaign_id},this.channel,this.acid,this.$route.query.adaccount);
       
        
        // Set Targets
        this.form.adSet.targets[0].targeting = JSON.parse(rule.rule_targets[0].targeting)
        this.form.adSet.targets[0].id = rule.rule_targets[0].audience_id;
        this.form.adSet.targets[0].name = rule.rule_targets[0].name;

        this.form.source_page = rule.source_page;
        this.form.instagram_actor_id = rule.instagram_actor_id;

        this.form.conditions = rule.rule_trigger;

      },

      getRule(rule_id){

        axios.get('/api/fb/rules/'+this.adaccount+'/'+rule_id)
            .then((response) => {
                   this.edit_data = response.data.data;
                   this.editRule(this.edit_data);              
            })
            .catch(function (error) {
            }).finally( () => {
                    this.isLoading = false;
                  });
      }
      // Edit Rule

		},
		created(){
            if((this.channel = this.$route.query.channel) && (this.acid = this.$route.query.acid)){
                this.adaccount = this.$route.query.adaccount;
                this.fetchCampaign({},this.channel,this.acid,this.$route.query.adaccount);   
            }

            if(this.$route.query.edit){
              this.edit = true;
              this.editID = this.$route.query.edit;
              this.getRule(this.$route.query.edit);
            }
		},
    mounted(){
      // this.$refs.wizard.changeTab(1,2);
    },
    watch:{
        'sourcepage' : function(val,old){
            this.form.sourcepage = this.facebook_pages[val].id;
            this.fetchInstagram(this.channel,this.acid,this.adaccount,this.facebook_pages[val].id,this.facebook_pages[val].access_token);
        },
        'adaccount' : function(val,old){
          this.form.ad_account_id = val;
        },
    }
	}

</script>

<style>
.vue-form-wizard .wizard-nav-pills>li>a.disabled{
    color: #616161;
        font-size: 18px !important;
}
.vue-form-wizard .wizard-icon-circle .wizard-icon{
    font-style: normal;
}
.vue-form-wizard .wizard-icon-circle .wizard-icon-container{
        border-radius: 50%;
}
.vue-form-wizard.md .wizard-navigation .wizard-progress-with-circle{
    top: 26px;
        background-color: #f3f2ee;
}
.vue-form-wizard.md .wizard-icon-circle{
    width: 45px;
    height: 45px;
}

.m-checkbox{
  margin-right:4px;
  margin-bottom: 0;
}

.wizard-nav-pills li.active .wizard-icon-container,
.wizard-nav-pills li .checked.wizard-icon-container{
  background:url(/backend/images/chat-bot.jpeg);
      background-size: 100% 100%;
}

.wizard-nav-pills li.active .wizard-icon{
  display:none !important;
}

.vue-form-wizard.md .wizard-icon-circle.checked .wizard-icon{
  color:#fe3c3d;
}
</style>