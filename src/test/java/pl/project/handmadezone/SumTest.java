package pl.project.handmadezone;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class SumTest {

    @Test
    void testAdd() {
        // Arrange
        Sum sum = new Sum();

        // Act
        int result = sum.add(3, 5);

        // Assert
        assertEquals(8, result, "5 + 3 should equal 8");
    }
}
