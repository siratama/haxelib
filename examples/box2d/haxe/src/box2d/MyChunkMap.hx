package box2d;
import box2d.polygon.Flipper;
import box2d.circle.CircleTest2;
import box2d.circle.CircleTest;
import box2d.box.Character;
import box2d.box.BoxBackground;
import com.dango_itimi.box2d.fla.ChunkMap;

class MyChunkMap extends ChunkMap{

	//box
	public static inline var ID_BOX_BACKGROUND:Int = 0;
	public static inline var ID_CHARACTER:Int = 1;

	//circle
	public static inline var ID_CIRCLE:Int = 0;
	public static inline var ID_CIRCLE2:Int = 1;

	//polygon
	public static inline var ID_FLIPPER:Int = 0;

	//groupIndex
	private static inline var GROUP_CIRCLE:Int = -1;

	override private function initializeForBox() {

		createBox(ID_BOX_BACKGROUND, BoxBackground, false, false, 0, 1);
		createBox(ID_CHARACTER, Character, true, false, 1, 1, 1, false);
	}
	override private function initializeForCircle() {

		createCircle(ID_CIRCLE, CircleTest, false, true, 1, 0, 1, false, GROUP_CIRCLE);
		createCircle(ID_CIRCLE2, CircleTest2, true, true, 1, 0.5, 1, false, GROUP_CIRCLE);
	}
	override private function initializeForPolygon() {

		createPolygon(ID_FLIPPER, Flipper, true, true, 1, 0, 1, false);
	}
}
