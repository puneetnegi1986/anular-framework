<div id="about-page" class="page">
	<div class="row module-set">
		<div class="col-sm-12">
			<section class="module">
				<header class="module-header">
					<h2 class="voice voice-brand pull-left">Add New Record</h2>
					<div class="pull-right">
						
					</div>
				</header>
				<div class="module-body">
				
			<!-- ------------------------------------------------ -->
				<form name="myForm" class="form-horizontal" novalidate>
        <div class="form-group">
            <label for="inputMgrName" class="control-label col-xs-2">Manager Name:</label>
            <div class="col-xs-5">
                <input type="text" class="form-control" id="inputMgrName" name="mName" ng-model="formData.mName" placeholder="Enter Manager's Name" required>
            </div>
            <div class="col-xs-3">
            	<span style="color: red" ng-show="myForm.mName.$dirty && myForm.mName.$invalid ">
					<span ng-show="myForm.mName.$error.required"> Manager Name Required. </span>
				</span>
			</div>
        </div>
		<div class="form-group">
            <label for="inputMgrId" class="control-label col-xs-2">Manager Id</label>
            <div class="col-xs-3">
                <input type="number" class="form-control" id="inputMgrId" name="mId" ng-model="formData.mId" placeholder="Enter Manager's Id" required>
            </div>
            <div class="col-xs-3">
            	<span style="color: red" ng-show="myForm.mId.$dirty && myForm.mId.$invalid ">
					<span ng-show="myForm.mId.$error.required"> Invalid Manager Id. </span>
				</span>
			</div>
        </div>
        
        <div class="form-group">
            <label for="inputPrjName" class="control-label col-xs-2">Project Name:</label>
            <div class="col-xs-5">
                <input type="text" class="form-control" id="inputPrjName" name="pName" ng-model="formData.pName" placeholder="Enter Project's Name" required>
            </div>
            <div class="col-xs-3">
            	<span style="color: red" ng-show="myForm.pName.$dirty && myForm.pName.$invalid ">
					<span ng-show="myForm.pName.$error.required"> Project's Name Required. </span>
				</span>
			</div>
        </div>
		<div class="form-group">
            <label for="inputPrjId" class="control-label col-xs-2">Project Id</label>
            <div class="col-xs-3">
                <input type="number" class="form-control" id="inputPrjId" name="pId" ng-model="formData.pId" placeholder="Enter Project's Id" required>
            </div>
            <div class="col-xs-3">
            	<span style="color: red" ng-show="myForm.pId.$dirty && myForm.pId.$invalid ">
					<span ng-show="myForm.pId.$error.required"> Invalid Project Id. </span>
				</span>
			</div>
        </div>
        
        <div class="form-group">
            <label for="inputDelName" class="control-label col-xs-2">Deliverable Name:</label>
            <div class="col-xs-5">
                <input type="text" class="form-control" id="inputDelName" name="dName" ng-model="formData.dName" placeholder="Enter Deliverable's Name" required>
            </div>
            <div class="col-xs-3">
            	<span style="color: red" ng-show="myForm.dName.$dirty && myForm.dName.$invalid ">
					<span ng-show="myForm.dName.$error.required"> Deliverable Name Required. </span>
				</span>
			</div>
        </div>
		<div class="form-group">
            <label for="inputDelId" class="control-label col-xs-2">Deliverable Id</label>
            <div class="col-xs-3">
                <input type="number" class="form-control" id="inputDelId" name="dId" ng-model="formData.dId" placeholder="Enter Deliverable Id" required>
            </div>
            <div class="col-xs-3">
            	<span style="color: red" ng-show="myForm.dId.$dirty && myForm.dId.$invalid ">
					<span ng-show="myForm.dId.$error.required"> Invalid Deliverable Id. </span>
				</span>
			</div>
        </div>
        
		<div class="form-group">
            <label for="inputDueDate" class="control-label col-xs-2">Due Date</label>
            <div class="col-xs-4">
                <input type="date" min="1990-01-01" max="2030-12-31" class="form-control" id="inputDueDate" name="dDate" ng-model="formData.dDate" placeholder="Enter Due Date" required>
            </div>
            <div class="col-xs-3">
            	<span style="color: red" ng-show="myForm.dDate.$dirty && myForm.dDate.$invalid ">
					<span ng-show="myForm.dDate.$error.required"> Not a valid Date. </span>
				</span>
			</div>
        </div>
		
       
        <div class="form-group">
            <div class="col-xs-offset-1 col-xs-2">
                <button type="submit" class="btn btn-success btn-lg btn-block" ng-disabled="myForm.mName.$invalid || myForm.pName.$invalid || myForm.pId.$invalid ||myForm.dName.$invalid || myForm.dId.$invalid || myForm.dDate.$invalid" ng-click="callWebService(); " >Save Record</button>
            </div>			
			 <div class="col-xs-2">
                <button type="reset" ng-click="test(); " class="btn btn-danger btn-lg  btn-block">Reset</button>
            </div>
			
			
        </div>
    </form>
				
				</div>
			</section>
		</div>
	</div>
</div>
