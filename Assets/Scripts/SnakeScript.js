#pragma strict

var segPrefab:GameObject;
var mainCamera:Camera;
var speed:int;

private var targetDirection:Vector3;
private var segList = new Array();
private var MoveList = new Array();
private var lastSeg:GameObject;

function Start ()
{
	targetDirection = new Vector3(0,0,0);

	var newSeg:GameObject = Network.Instantiate(segPrefab, this.transform.position - this.transform.forward * 2, this.transform.rotation, 0);
	var newSegScript:SegScript = newSeg.gameObject.GetComponent(SegScript);
	newSegScript.Direction = targetDirection;
	newSegScript.speed = speed;
	segList.Add(newSeg);
	lastSeg = newSeg;
}

function Update ()
{
	ClickToMove();
}

function OnTriggerEnter(colliderInfo:Collider)
{
	if(colliderInfo.tag == "Wall" || colliderInfo.tag == "Player")
	{
		networkView.RPC("RmvObj", RPCMode.All, this.gameObject.networkView.viewID);
		for(var segObj:GameObject in segList)
			networkView.RPC("RmvObj", RPCMode.All, segObj.gameObject.networkView.viewID);
	}
	
	if(colliderInfo.tag == "Food")
	{
		networkView.RPC("RmvObj", RPCMode.All, colliderInfo.gameObject.networkView.viewID);
		networkView.RPC("Grow", RPCMode.All);
	}
}

function ClickToMove()
{
	if(Input.GetKeyDown(KeyCode.Mouse1))
	{
		var playerPlane = new Plane(Vector3.up, transform.position);
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		var hitdist = 0.0;
		
		if(playerPlane.Raycast(ray,hitdist))
		{
			var targetPoint = ray.GetPoint(hitdist);
			var targetRotation = Quaternion.LookRotation(targetPoint - transform.position);
			transform.rotation = targetRotation;
			targetDirection = Vector3.Normalize(targetPoint - this.transform.position);
			targetDirection.y = 0;
			var movePoint = this.transform.position;
			MoveList.Add(movePoint);
			for(var segObj:GameObject in segList)
			{
				var segObjScript:SegScript = segObj.gameObject.GetComponent(SegScript);
				segObjScript.MoveList.Add(movePoint);
				segObjScript.Direction = targetDirection;
			}
		}
	}
	
	var lastSegScript = lastSeg.GetComponent(SegScript);
	if(MoveList.length > 0)
	{
		if(lastSegScript.MoveList.length > 0)
		{
			if(lastSegScript.MoveList[0] != MoveList[0])
			{
				MoveList.Shift();
				Debug.Log("Move removed from list");
			}
		}
		else
		{
			MoveList.Shift();
			Debug.Log("No moves left for seg, move removed");
			Debug.Log(MoveList.length);
		}
	}
		
	
	transform.position += speed * targetDirection * Time.deltaTime;
	transform.rotation.x = 0;
	transform.rotation.z = 0;
}

@RPC
function RmvObj(netID:NetworkViewID) 
{
	Network.Destroy(netID);
}

@RPC
function Grow()
{
	var prevSeg:GameObject = segList[segList.length-1];
	var newSeg:GameObject = Network.Instantiate(segPrefab, prevSeg.transform.position - prevSeg.transform.forward * 1.5, prevSeg.transform.rotation, 0);
	var newSegScript:SegScript = newSeg.gameObject.GetComponent(SegScript);
	newSegScript.Direction = targetDirection;
	newSegScript.speed = speed;
	newSegScript.MoveList = MoveList;
	segList.Add(newSeg);
	lastSeg = newSeg;
}